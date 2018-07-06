const StepsTypes = {
  Description: 'Description',
  Rules: 'Rules',
  Eligibility: 'Eligibility',
  Question: 'Question',
};

const onboarding = {
  steps: [{
    id: 0,
    type: StepsTypes.Description,
    fields: [],
  }, {
    id: 1,
    type: StepsTypes.Rules,
    fields: [],
  }, {
    id: 2,
    type: StepsTypes.Eligibility,
    fields: [],
  }, {
    id: 3,
    type: StepsTypes.Question,
    fields: [],
  }, {
    id: 4,
    type: StepsTypes.Question,
    fields: [],
  }, {
    id: 4,
    type: StepsTypes.Question,
    fields: [],
  }],
};

export class OnboardingMocks {
  stepsMap = new Map();

  fetchStatus = (jobId) => {
    const steps = this.getSteps(jobId);
    const activeStep = this.getActiveStep(steps);
    return ({
      onboardingStatus: {
        jobId,
        activeStep,
        steps,
      },
    });
  }

  inject = (job) => {
    job.onboarding = onboarding;
  }

  submitStep = (jobId, stepId, response) => {
    const steps = this.getSteps(jobId);
    const step = onboarding.steps.find(s => s.id === stepId);
    steps.push({ id: stepId, status: this.validateStep(step, response) });
    const activeStep = this.getActiveStep(steps);
    return ({
      onboardingStatus: {
        jobId,
        activeStep,
        steps,
      },
    });
  }

  validateStep = (step, response) => {
    const data = JSON.parse(response);
    console.log(data);
    return 'complete';
  }

  getActiveStep = (steps) => {
    if (!steps.length) {
      return onboarding.steps[0].id;
    }
    const completed = steps.reverse().find(step => step.status === 'complete');
    if (!completed) {
      return null;
    }
    const index = onboarding.steps.findIndex(s => s.id === completed.id);
    const nextStep = onboarding.steps[index + 1];
    return nextStep ? nextStep.id : null;
  }

  getSteps = (jobId) => {
    let steps = this.stepsMap.get(jobId);
    if (!steps) {
      steps = [];
      this.stepsMap.set(jobId, steps);
    }
    return steps;
  }
}

export const mock = new OnboardingMocks();
