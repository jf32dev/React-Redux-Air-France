import { configure } from 'mobx';

configure({
  enforceActions: 'observed',
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});
