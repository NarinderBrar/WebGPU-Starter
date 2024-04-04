import { Pane } from 'tweakpane';

class UIController{
    constructor() {
        
  const PARAMS = {
    level: 0,
    name: 'Test',
    active: true,
  };

  const pane = new Pane({
    title: 'Debug',
    expanded: false,
  });

  pane.addInput(PARAMS, 'level', {min: 0, max: 100});
  pane.addInput(PARAMS, 'name');
  pane.addInput(PARAMS, 'active');

    };
}