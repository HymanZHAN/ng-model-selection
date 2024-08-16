import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  combineLatestWith,
  map,
  startWith,
} from 'rxjs';

export interface Model {
  name: string;
  isDefault: boolean;
}

export interface ModelInSelection {
  selected: boolean;
  name: string;
}

const DATA: Model[] = [
  { name: 'Model 1', isDefault: false },
  { name: 'Model 2', isDefault: true },
  { name: 'Model 3', isDefault: false },
  { name: 'Model 4', isDefault: false },
];

const toModelsInUI = (models: Model[]): ModelInSelection[] => {
  return models.map(({ name, isDefault }) => ({ name, selected: isDefault }));
};

const selectModel = (input: [Model[], string]) => {
  const [models, selectedModel] = input;
  return models.map((m) =>
    m.name === selectedModel
      ? { name: m.name, selected: true }
      : { name: m.name, selected: false },
  );
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _availableModels = new BehaviorSubject(DATA);

  selectModel$ = new Subject<string>();

  modelsInSelection$ = this._availableModels.pipe(
    combineLatestWith(this.selectModel$),
    map(selectModel),
    startWith(toModelsInUI(this._availableModels.getValue())),
  );

  selectedModel$ = this.modelsInSelection$.pipe(
    map((models) => models.find((m) => m.selected)),
  );
}
