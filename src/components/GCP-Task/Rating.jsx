import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css } from 'glamor';

const styles = {
  cell: css({
    padding: 15,
    color: '#ff7092',
    fontWeight: 500,
    textAlign: 'center',
    borderRight: '1px solid',
    backgroundColor: 'rgba(255, 112, 146, 0.05)',
    cursor: 'pointer',
    flex: 1,
    ':hover': {
      backgroundColor: 'rgba(255, 112, 146, 0.15)',
    },
    borderColor: 'transparent',
    borderRightColor: '#ff7092',
    outline: 'none',
    '@media(max-width: 800px)': {
      'padding': 0,
    },
  }),
  activeCell: css({
    backgroundColor: 'rgba(255, 112, 146, 0.15)',
  }),

  root: css({
    width: 'calc(100% + 30px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ff7092',
    borderRadius: 3,

    '> button:last-child': { borderRight: 'none' },
    '@media(max-width: 800px)': {
      'width': '100%',
    },
  }),

  labelSection: css({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,

    '> span': {
      fontWeight: 400,
      fontSize: 13,
    },
  }),
};

export default function Rating({
  values,
  selected,
  highLabel,
  lowLabel,
  onChange,
}) {
  return (
    <div>
      <div className={styles.root}>
        {values.map((val) => {
          const classes = classnames({
            [styles.cell]: true,
            [styles.activeCell]: selected === val,
          });

          const handleClick = () => onChange(val);
          return (
            <button key={val} onClick={handleClick} className={classes}>
              <img src={"../../images/smiley-faces/"+ val +".svg"} />
            </button>
          );
        })}
      </div>

      <div className={styles.labelSection}>
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}

Rating.defaultProps = {
  values: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  selected: 'B',

  lowLabel: 'Poor',
  highLabel: 'Amazing',

  onChange() {},
};

Rating.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.string,

  lowLabel: PropTypes.string,
  highLabel: PropTypes.string,

  onChange: PropTypes.func,
};
