// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { all, fork } from 'redux-saga/effects';
import { findAllScenariosData } from './FindAllScenarios';
import { getScenariosTreeData } from './GetScenariosTree';
import { getScenarioByIdData } from './FindScenarioById';

export default function * scenarioSaga () {
  yield all([
    fork(findAllScenariosData),
    fork(getScenariosTreeData),
    fork(getScenarioByIdData)
  ]);
}
