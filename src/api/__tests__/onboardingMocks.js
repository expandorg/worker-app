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

  fetchStatus = jobId => ({
    onboardingStatus: {
      jobId,
      steps: this.getSteps(jobId),
    },
  })

  inject = (job) => {
    job.onboarding = onboarding;
  }

  submitStep = (jobId, stepId, response) => {
    const steps = this.getSteps(jobId);
    const step = onboarding.steps.find(s => s.id === stepId);
    const status = this.validateStep(step, response);
    steps.push({ id: stepId, status });
    return ({
      onboardingStatus: {
        jobId,
        steps: this.getSteps(jobId),
      },
    });
  }

  validateStep = (step, response) => {
    const data = JSON.parse(response);
    console.log(data);
    return 'complete';
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
