import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DateInput from '../../../common/DateInput';
import AutocompletePlaces from '../../../common/Autocomplete/AutocompletePlaces';

import ProfileField from './ProfileField';
import LanguagesInput from './LanguagesInput';
import GenderInput from './GenderInput';
import EducationInput from './EducationInput';
import InterestsInput from './InterestsInput';

import styles from './ProfileForm.module.styl';

export const makeProfile = user => ({
  languages: user.languages || [],
  location: user.location || '',
  birthday: user.birthday || new Date(),
  gender: user.gender || '',
  education: user.education || '',
  interests: user.intersts || [],
});

export default class ProfileForm extends Component {
  static propTypes = {
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.string.isRequired,
    birthday: PropTypes.instanceOf(Date).isRequired,
    gender: PropTypes.string.isRequired,
    education: PropTypes.string.isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  }


  handleChange = (prop, value) => {
    this.props.onChange({ [prop]: value });
  }

  render() {
    const {
      languages, location, birthday, gender, education, interests,
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
          <AutocompletePlaces
            placeholder="Country, City"
            value={location}
            onChange={value => this.handleChange('location', value)}
          />
        </ProfileField>
        <ProfileField name="Birth date">
          <DateInput
            value={birthday}
            className={styles.birthdate}
            onChange={value => this.handleChange('birthday', value)}
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
        <ProfileField name="Interests">
          <InterestsInput
            value={interests}
            onChange={value => this.handleChange('interests', value)}
          />
        </ProfileField>
      </div>
    );
  }
}
