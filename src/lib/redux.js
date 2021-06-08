// I've put all off the redux into a single file for simplicity as this is a demo app.
// In a real app we'd of course have separate files for actions.js, constants.js, reducers.js, etc.
// This demo app also uses dummy data, rather than getting real data from a server via a GET API call.
import { createStore } from "redux";

export const actions = {
  ARCHIVE_TASK: "ARCHIVE_TASK",
  PIN_TASK: "PIN_TASK"
};

export const archiveTask = id => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = id => ({ type: actions.PIN_TASK, id });

function taskStateReducer(taskState) {
  return (state, action) => {
    return {
      ...state,
      tasks: state.tasks.map(task =>
        task.id === action.id ? { ...task, state: taskState } : task
      )
    };
  };
}

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer("TASK_ARCHIVED")(state, action);
    case actions.PIN_TASK:
      return taskStateReducer("TASK_PINNED")(state, action);
    default:
      return state;
  }
};

const defaultTasks = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" }
];

export default createStore(reducer, { tasks: defaultTasks });
