import React, { ReactElement } from 'react';
import { FlagType } from './featureFlags';

type ReadOnlyType = {
  features: FlagType[];
  notDefaultIndicator?: ReactElement;
};

const checked = (
  <span
    className='badge badge-pill badge-success rounded-pill bg-success'
    data-feature-is-active='true'
  >
    Active
  </span>
);

const disabled = (
  <span
    className='badge badge-pill badge-light rounded-pill bg-light text-dark'
    data-feature-is-active='false'
  >
    Disabled
  </span>
);

const ReadOnly = ({ features, notDefaultIndicator }: ReadOnlyType) => (
  <ul
    className='list-group list-group-flush container'
    data-testid='coreFeatureFlagsUIReadonly'
  >
    {features.map((feature) => (
      <li
        className='list-group-item row'
        key={feature.id}
        style={{ display: 'flex' }}
      >
        <div className='col-sm-2'>{feature.active ? checked : disabled}</div>
        <div className='col'>
          <span className='font-weight-bold fw-bold' data-label-title>
            {' '}
            {feature.title ?? feature.id}
          </span>
          {feature.active !== feature.original ? (
            <span data-testid='flagNotInitialWarning'>
              {' '}
              {notDefaultIndicator}
            </span>
          ) : null}
          {feature.description ? (
            <div
              className='text-muted font-italic fst-italic'
              data-label-description
            >
              {feature.description}
            </div>
          ) : null}
        </div>
      </li>
    ))}
  </ul>
);

export default ReadOnly;
