import React from 'react';
import { FlagType } from './featureFlags';
import ExclamationCircle from './ExclamationCircle';

type CoreUIType = {
  features: FlagType[];
  onFeatureClick: (id: string, checked: boolean) => void;
  onFeatureReset: () => void;
  // readonly?: boolean;
};

const CoreUI = ({
  features = [],
  onFeatureClick = () => {},
  onFeatureReset = () => {},
}: // readonly = false,
CoreUIType) => (
  <>
    <h2>Feature flags</h2>
    <ul>
      {features.map((feature) => (
        <li key={feature.id}>
          <div className='form-check form-switch custom-control custom-switch'>
            <input
              className='form-check-input custom-control-input'
              type='checkbox'
              id={feature.id}
              checked={feature.active}
              onChange={(e) => {
                onFeatureClick(feature.id, e.target.checked);
              }}
            />{' '}
            <label
              className='form-check-label custom-control-label'
              htmlFor={feature.id}
            >
              {feature.description ?? feature.id}{' '}
              {feature.active !== feature.original ? (
                <ExclamationCircle />
              ) : null}
            </label>
          </div>
        </li>
      ))}
    </ul>
    <button
      type='button'
      className='btn btn-success'
      onClick={() => onFeatureReset()}
    >
      Reset flags to default
    </button>
  </>
);

export default CoreUI;
