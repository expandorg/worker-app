import React from 'react';
import styles from './styles/General.module.styl';
import custom from './styles/Custom.module.styl';
import taskImg from '../../../public/images/complete-tasks.png';
import ListQuestions from './listQuestions';

class Eligibility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: 0,
      showTaskQuestions: false,
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getListQuestions();
  }

  getQuestions() {
    this.setState({
      showTaskQuestions: true,
    });
  }
  getListQuestions() {
    const listQuestions = {
      tries: 1,
      questions: [
        {
          questionText: 'Horizontal Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin. Nulla sit amet cursus quam, in bibendum felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin',
          type: 1,
          answers: {
            A: 'answer0', B: 'answer1', C: 'answer2', D: 'answer3',
          },
        },
        {
          questionText: 'Vertical Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin. Nulla sit amet cursus quam, in bibendum felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin',
          type: 2,
          answers: {
            A: 'test', B: 'test2', C: 'answer', D: 'answer',
          },
        },
        {
          questionText: 'Yes no Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin. Nulla sit amet cursus quam, in bibendum felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin',
          type: 3,
          answers: {},
        },
        {
          questionText: 'Horizontal Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin. Nulla sit amet cursus quam, in bibendum felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin',
          type: 1,
          answers: {
            A: 'answer0', B: 'answer1', C: 'answer2', D: 'answer3',
          },
        },
      ],
    };
    console.log('get questions', listQuestions);
    this.setState({
      questions: listQuestions,
    });
  }
  render() {
    return (
      <div className={custom.boxEligibility}>
        {!this.state.showTaskQuestions ?
          <div className={styles.taskContainer}>
            <h3>Task instruction</h3>
            <p className={styles.phWhiteGrey}>
              To be eligible for this task you will have to pass a test
              to show you understand the task and can complete it with both
              accuracy and speed. There are 13 questions in this test. Do not
              share the contents of the test or the answers with anyone.
              To ensure there is no sharing, the articles chosen for
              this test will be randomized.You will have 2 tries
              to score 100% on the test. The test is not paid.
            </p>
            <div className={custom.imgBox}>
              <img src={taskImg} alt="" />
            </div>
            <div className={custom.btnEglibilitbox}>
              <button
                className={styles.btnPink}
                onClick={this.getQuestions}
              >Begin the eligibility test now
              </button>
            </div>
          </div> : null}
        {this.state.showTaskQuestions ?
          <ListQuestions listQuestion={this.state.questions} />
          : null}
      </div>
    );
  }
}
export default Eligibility;

