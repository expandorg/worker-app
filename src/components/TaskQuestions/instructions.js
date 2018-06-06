import React from 'react';
import taskImg from '../../../public/images/complete-tasks.png';
import styles from './Question.module.styl';
import ListQuestions from './listQuestions';
// import { gemsService } from '../../services/';

class Instructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTaskQuestions: false,
      questions: 0,
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
      tries: 5,
      questions: [
        {
          question: 'Horizontal Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin. Nulla sit amet cursus quam, in bibendum felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin',
          type: 1,
          answers: {
            A: 'answer0', B: 'answer1', C: 'answer2', D: 'answer3',
          },
        },
        {
          question: 'Vertical Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin. Nulla sit amet cursus quam, in bibendum felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin',
          type: 2,
          answers: {
            A: 'test', B: 'test2', C: 'answer', D: 'answer',
          },
        },
        {
          question: 'Yes no Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin. Nulla sit amet cursus quam, in bibendum felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin',
          type: 1,
          answers: {},
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
      <div>
        {!this.state.showTaskQuestions ?
          <div className={styles.taskContainer}>
            <h3>Your task</h3>
            <p className={styles.phDarkGrey}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque nec maximus turpis.
            Nulla sit amet cursus quam, in bibendum felis.
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Pellentesque nec maximus turpis.
            Nullam maximus eu nisl sed sollicitudin
            </p>
            <div className={styles.imgBox}>
              <img src={taskImg} alt="" />
            </div>
            <div className="btn-box">
              <button className={styles.btnPinkTrans}>Read article</button>
              <button className={styles.btnGrey} onClick={this.getQuestions} >Start task</button>
            </div>
          </div> : null}
        {this.state.showTaskQuestions ?
          <ListQuestions listQuestion={this.state.questions} />
        : null}
      </div>
    );
  }
}
export default Instructions;
