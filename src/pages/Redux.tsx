/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import { FeatureFlagsReduxUI, isFeatureActive } from '../components';

import { VEGGIES, FRUITS } from '../FeatureFlagsConfig';

const ReduxPage = () => {
  const isVeggies = useSelector((state) => isFeatureActive(VEGGIES, state));
  const isFruits = useSelector((state) => isFeatureActive(FRUITS, state));
  return (
    <div className='container'>
      <h1>Feature flags - redux</h1>
      <FeatureFlagsReduxUI />

      {isFruits ? (
        <div>
          <hr />
          <h2>Fruit content</h2>
          <p>
            Thai basil curry dark chocolate grapefruit avocado basil pesto
            habanero golden cherry balsamic vinaigrette spicy kimchi Thai curry
            roasted brussel sprouts blueberry pops scotch bonnet pepper
            creamiest strawberry mango smoothie banana creamy cauliflower
            alfredo sauce udon noodles picnic crispy salted coriander ginger
            carrot spiced juice hazelnut shiitake.
          </p>
        </div>
      ) : null}

      {isVeggies ? (
        <div>
          <hr />
          <h2>Veggie content</h2>
          <p>
            Fiery fruit hot Thai super chili red amazon pepper with Thai sun
            pepper red lentil curry tabasco pepper summertime crumbled lentils
            blueberries crunchy seaweed basil roasted peanuts tofu avocado
            dressing drizzle orange naga viper cremini mushrooms alfalfa sprouts
            picnic salad green pepper black bean wraps dark and stormy
            overflowing a delicious meal leek lychee.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default ReduxPage;
