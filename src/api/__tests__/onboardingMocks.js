import ApiError from '../../common/api/ApiError';

const onboarding = [{
  id: 0,
  stage: 'InProgress',
  submit: {
    caption: 'Proceed to rules',
  },
  fields: [{
    type: 'article',
    name: 'article',
    title: 'Task',
    content: 'Your task will be to read Medium articles that have recently been published and decide if the articles pass Medium’s Quality Control Guidelines.  If the article passes the guidelines you will click accept. While reading the article if you see it fails a guideline, stop reading and click reject.',
  }],
}, {
  id: 1,
  stage: 'InProgress',
  submit: {
    caption: 'Let\'s do this',
  },
  fields: [{
    type: 'article',
    name: 'article',
    title: 'Rules',
    content: 'As part of the task you must understand the Medium Quality Control Guidelines. Please familiar yourself with these rules now and keep them in a place where you can easily access them. By clicking agree you agree to our terms of service, and are committed to perform the task to the best of your ability.',
  }, {
    type: 'rules',
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
  stage: 'InProgress',
  submit: {
    caption: 'Start test',
  },
  fields: [{
    type: 'article',
    name: 'article',
    title: 'Eligibility',
    image: '/images/complete-tasks.png',
    content: 'To be eligible for this task you will have to pass a test to show you understand the task and can complete it with both accuracy and speed. There are 13 questions in this test. Do not share the contents of the test or the answers with anyone. To ensure there is no sharing, the articles chosen for this test will be randomized. You will have 2 tries to score 100% on the test. The test is not paid.',
  }],
}, {
  id: 3,
  stage: 'InProgress',
  fields: [{
    type: 'qa',
    name: 'qa',
    link: 'https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c',
    submit: 'Next Question',
    number: 1,
    total: 3,
    tries: 1,
    rulesTitle: 'Read task instructions here!',
    rulesContent: 'Your task will be to read Medium articles that have recently been published and decide if the articles pass Medium’s Quality Control Guidelines.  If the article passes the guidelines you will click accept. While reading the article if you see it fails a guideline, stop reading and click reject. ',
    instructionsTitle: 'Instructions text',
    instructionsContent: 'To be eligible for this task you will have to pass a test to show you understand the task and can complete it with both accuracy and speed. There are 13 questions in this test. Do not share the contents of the test or the answers with anyone. To ensure there is no sharing, the articles chosen for this test will be randomized. You will have 2 tries to score 100% on the test. The test is not paid.',
    answers: [
      { id: 'A', caption: 'Answer A' },
      { id: 'B', caption: 'Answer B' },
      { id: 'C', caption: 'Answer C' },
      { id: 'D', caption: 'Answer D Long' },
    ],
    question: 'Cam sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod?',
  }],
}, {
  id: 4,
  stage: 'InProgress',
  fields: [{
    type: 'qa',
    name: 'qa',
    link: 'https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c',
    submit: 'Next Question',
    number: 2,
    total: 3,
    tries: 1,
    rulesTitle: 'Read task instructions here!',
    rulesContent: 'Your task will be to read Medium articles that have recently been published and decide if the articles pass Medium’s Quality Control Guidelines.  If the article passes the guidelines you will click accept. While reading the article if you see it fails a guideline, stop reading and click reject. ',
    instructionsTitle: 'Instructions text',
    instructionsContent: 'To be eligible for this task you will have to pass a test to show you understand the task and can complete it with both accuracy and speed. There are 13 questions in this test. Do not share the contents of the test or the answers with anyone. To ensure there is no sharing, the articles chosen for this test will be randomized. You will have 2 tries to score 100% on the test. The test is not paid.',
    answers: [
      { id: '1', caption: 'Answer 1' },
      { id: '2', caption: 'Answer 2' },
      { id: '3', caption: 'Answer 3' },
      { id: '4', caption: 'Answer 4 Long' },
    ],
    question: 'Cam sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod?',
  }],
}, {
  id: 5,
  stage: 'InProgress',
  fields: [{
    type: 'qa',
    name: 'qa',
    link: 'https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c',
    submit: 'Next Question',
    number: 3,
    total: 3,
    tries: 1,
    rulesTitle: 'Read task instructions here!',
    rulesContent: 'Your task will be to read Medium articles that have recently been published and decide if the articles pass Medium’s Quality Control Guidelines.  If the article passes the guidelines you will click accept. While reading the article if you see it fails a guideline, stop reading and click reject. ',
    instructionsTitle: 'Instructions text',
    instructionsContent: 'To be eligible for this task you will have to pass a test to show you understand the task and can complete it with both accuracy and speed. There are 13 questions in this test. Do not share the contents of the test or the answers with anyone. To ensure there is no sharing, the articles chosen for this test will be randomized. You will have 2 tries to score 100% on the test. The test is not paid.',
    answers: [
      { id: 'I', caption: 'Answer I' },
      { id: 'II', caption: 'Answer II' },
      { id: 'III', caption: 'Answer III' },
      { id: 'IV', caption: 'Answer IV Long' },
    ],
    question: '// QUESTION: number 3',
  }],
}, {
  id: 6,
  stage: 'Complete',
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

    const error = this.validate(currentForm, response, current);
    if (error) {
      return ({ error });
    }
    if (progress.length === onboarding.length) {
      return ({ onboarding: { ...current, form: currentForm } });
    }

    const curretIndex = onboarding.findIndex(page => page.id === pageId);
    const { id, stage, ...form } = onboarding[curretIndex + 1];
    const next = { jobId, pageId: id, stage };
    progress.push(next);
    return ({ onboarding: { ...next, form } });
  }

  validate(form, response, current) {
    if (current.pageId === 1) {
      if (response.rules !== true) {
        throw new ApiError('You should read and accept rules');
      }
    }
    return null;
  }

  getOnboardingForm = (pageId) => {
    const { id, stage, ...form } = onboarding.find(page => page.id === pageId);
    return form;
  }

  getProgress = (jobId) => {
    let progress = this.progessMap.get(jobId);
    if (!progress) {
      progress = [{ jobId, pageId: onboarding[0].id, stage: onboarding[0].stage }];
      this.progessMap.set(jobId, progress);
    }
    return progress;
  }
}

export const mock = new OnboardingMocks();
