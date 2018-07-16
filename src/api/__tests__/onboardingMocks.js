import { FieldType } from '../../model/enums';

const onboarding = [{
  id: 10,
  fields: [{
    type: FieldType.qa,
    name: 'qa',
    submit: 'Next Question',
    number: 3,
    total: 12,
    tries: 5,
    answers: [
      { id: 'A', caption: 'Answer A' },
      { id: 'B', caption: 'Answer B' },
      { id: 'C', caption: 'Answer C' },
      { id: 'D', caption: 'Answer D Long' },
    ],
    question: 'Cam sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod?',
  }],
}, {
  id: 0,
  submit: {
    caption: 'Proceed to rules',
  },
  fields: [{
    type: FieldType.article,
    name: 'article',
    title: 'Task',
    content: 'Your task will be to read Medium articles that have recently been published and decide if the articles pass Medium’s Quality Control Guidelines.  If the article passes the guidelines you will click accept. While reading the article if you see it fails a guideline, stop reading and click reject.',
  }],
}, {
  id: 1,
  submit: {
    caption: 'Let\'s do this',
  },
  fields: [{
    type: FieldType.article,
    name: 'article',
    title: 'Rules',
    content: 'As part of the task you must understand the Medium Quality Control Guidelines. Please familiar yourself with these rules now and keep them in a place where you can easily access them. By clicking agree you agree to our terms of service, and are committed to perform the task to the best of your ability.',
  }, {
    type: FieldType.rules,
    name: 'rules',
    buttonTitle: 'Read rules',
    checkbox: 'I have read the instructions and I agree with the terms',
    headline: 'Task',
    title: 'Read task instructions here!',
    rules: 'Your task will be to read Medium articles that have recently been published and decide if the articles pass Medium’s Quality Control Guidelines.  If the article passes the guidelines you will click accept. While reading the article if you see it fails a guideline, stop reading and click reject. ',
    close: 'Ok',
  }],
}, {
  id: 2,
  submit: {
    caption: 'Start test',
  },
  fields: [{
    type: FieldType.article,
    name: 'article',
    title: 'Eligibility',
    image: '/images/complete-tasks.png',
    content: 'To be eligible for this task you will have to pass a test to show you understand the task and can complete it with both accuracy and speed. There are 13 questions in this test. Do not share the contents of the test or the answers with anyone. To ensure there is no sharing, the articles chosen for this test will be randomized. You will have 2 tries to score 100% on the test. The test is not paid.',
  }],
}, {
  id: 3,
  fields: [],
}, {
  id: 4,
  fields: [],
}, {
  id: 5,
  fields: [],
}];


export class OnboardingMocks {
  progessMap = new Map();

  fetch = (jobId) => {
    const progress = this.getProgress(jobId);
    const current = progress[progress.length - 1];
    const form = this.getOnboardingForm(current.pageId);
    return ({ onboarding: { ...current, form } });
  }


  submit = (jobId, pageId, response) => {
    const progress = this.getProgress(jobId);
    const currentForm = this.getOnboardingForm(pageId);
    const current = progress[progress.length - 1];

    const valid = this.validatePage(currentForm, response, current);

    if (!valid) {
      return ({ error: 'validation error' });
    }

    if (progress.length === onboarding.length) {
      return ({ onboarding: { ...current, form: currentForm } });
    }

    const curretIndex = onboarding.findIndex(page => page.id === pageId);
    const form = onboarding[curretIndex + 1];
    const next = { jobId, pageId: form.id, status: 'pending' };
    progress.push(next);

    return ({ onboarding: { ...next, form } });
  }

  validatePage = (form, response, current) => {
    const data = JSON.stringify(response);
    console.log(data);
    current.status = 'complete';
    return true;
  }

  getOnboardingForm = pageId =>
    onboarding.find(page => page.id === pageId)

  getProgress = (jobId) => {
    let progress = this.progessMap.get(jobId);
    if (!progress) {
      progress = [{ jobId, pageId: onboarding[0].id, status: 'pending' }];
      this.progessMap.set(jobId, progress);
    }
    return progress;
  }
}

export const mock = new OnboardingMocks();
