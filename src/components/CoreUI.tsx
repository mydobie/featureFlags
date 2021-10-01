import React, { ReactElement } from 'react';
import { FlagType } from './featureFlags';
import ExclamationCircle from './ExclamationCircle';

type CoreUIType = {
  features: FlagType[];
  onFeatureClick: (id: string, checked: boolean) => void;
  onFeatureReset: () => void;
  persist?: boolean;
};

export type FeatureFlagsUIProps = {
  onFeatureChange?: (flagId?: string, isActive?: boolean) => void;
  onFeatureReset?: () => void;
};

const CoreUI = ({
  features = [],
  onFeatureClick = () => {},
  onFeatureReset = () => {},
  persist = false,
}: CoreUIType): ReactElement => (
  <>
    <ul data-testid='coreFeatureFlagsUI'>
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
    {persist ? (
      <p
        className='alert alert-secondary'
        role='alert'
        data-testid='persistAlert'
      >
        <strong>NOTE:</strong> Feature flag values are persisting on page
        refresh. This is not recommended for a production environment. Check the{' '}
        <code>persist</code> setting when calling <code>loadFeatureFlags</code>{' '}
        or <code>loadFeatureFlagsRedux</code>.
      </p>
    ) : null}
    <button
      type='button'
      className='btn btn-success'
      data-testid='resetButton'
      onClick={() => onFeatureReset()}
    >
      Reset flags to default
    </button>
  </>
);

export default CoreUI;
