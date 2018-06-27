import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProfileField from './ProfileField';
import LanguagesInput from './LanguagesInput';
import GenderInput from './GenderInput';
import EducationInput from './EducationInput';
import InterestsInput from './InterestsInput';

import styles from './ProfileForm.module.styl';

export const makeProfile = user => ({
  languages: user.languages || [],
  location: user.location || '',
  age: user.age || 0,
  gender: user.gender || '',
  education: user.education || '',
  intersts: user.intersts || [],
});

export default class ProfileForm extends Component {
  static propTypes = {
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    education: PropTypes.string.isRequired,
    intersts: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }


  handleChange = (prop, value) => {
    this.props.onChange({ [prop]: value });
  }

  render() {
    const {
      languages, location, age, gender, education, intersts,
    } = this.props;
    return (
      <div className={styles.container}>
        <ProfileField name="Languages">
          <LanguagesInput
            value={languages}
            onChange={value => this.handleChange('languages', value)}
          />
        </ProfileField>
        <ProfileField name="Location">
          <input
            type="text"
            placeholder="Country, City"
            className={styles.input}
            value={location}
            onChange={({ target }) => this.handleChange('location', target.value)}
          />
        </ProfileField>
        <ProfileField name="You age">
          <input
            type="number"
            className={styles.input}
            placeholder="Your age"
            value={age}
            onChange={({ target }) => this.handleChange('age', target.value)}
          />
        </ProfileField>
        <ProfileField name="Gender">
          <GenderInput
            value={gender}
            onChange={value => this.handleChange('gender', value)}
          />
        </ProfileField>
        <ProfileField name="Education">
          <EducationInput
            value={education}
            onChange={value => this.handleChange('education', value)}
          />
        </ProfileField>
        <ProfileField name="Intersts">
          <InterestsInput
            value={intersts}
            onChange={value => this.handleChange('intersts', value)}
          />
        </ProfileField>
      </div>
    );
  }
}
