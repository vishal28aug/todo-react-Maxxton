import TodoActions from "./action";

//Initial State to use in application
let initalState = {
  todoList: [
    {
      id:1,
      title: "Design the solution	",
      description: "dentify resources to be monitored.",
      createdAt: "2020-10-11",
      dueDate: "2020-10-13",
      priority: "1",
      currentState: true,
    },
    {
      id:2,
      title: "Prepare for implementation",
      description: "Order the server hardware for production as well as test/quality assurance (QA).",
      createdAt: "2020-10-10",
      dueDate: "2020-10-12",
      priority: "2",
      currentState: false,
    },
    {
      id:3,
      title: "Install the product in the test/QA environment.",
      description: "Install Tivoli Business Systems Manager and appropriate maintenance on the test LPAR.",
      createdAt: "2012-10-10",
      dueDate: "2013-10-1",
      priority: "3",
      currentState: true,
    },
    {
      id:4,
      title: "Schedule jobs",
      description: "Tivoli Business Systems Manager SQL server jobs",
      createdAt: "2014-10-10",
      dueDate: "2015-10-13",
      priority: "4",
      currentState: false,
    },
    {
      id:5,
      title: "Install the product in the production environment.",
      description: "Configure servers, Source/390 on the production LPARs, event enablement on the Tivoli Enterprise Console server, and verify connectivity.",
      createdAt: "2017-10-25",
      dueDate: "2018-10-15",
      priority: "1",
      currentState: true,
    },
    {
      id:6,
      title: "Learn React",
      description: "learn all the basics and advanced of react",
      createdAt: '2019-10-21',
      dueDate: '2020-11-13',
      priority: "2",
      currentState: false,
    },
  ],
  groupBy: "none",
  filteredData: [],
  searchedValue:'',
};

function TodoReducer(state = initalState, action) {
  switch (action.type) {
    case TodoActions.ADD_TODO: {
      return {
        ...state,
        todoList: [action.payload, ...state.todoList],
      };
    }
    case TodoActions.UPDATE_TODO: {
      let index = state.todoList.findIndex( x => x.id === action.payload.id);
      if (index !== -1) {
        state.todoList[index] = action.payload;
      }
      return state;
    }
    case TodoActions.DELETE_TODO: {
      return{
        ...state,
        todoList: state.todoList.filter((x) => x !== action.payload)
      }
    }
    case TodoActions.CHANGE_TODO_STATE:{
      return{
        ...state,
        todoList: state.todoList.map((x) => {
          if(x.id === action.payload)  x.currentState = !x.currentState;

          return x;
        })
      }
    }
    case TodoActions.SET_GROUP_BY: {
      return{
        ...state,
        groupBy:action.payload
      }
    }
    case TodoActions.SEARCH: {
      let searchedValue = action.payload;
      let searchedResult = state.todoList.filter((todo) => todo.title.toLowerCase().includes(searchedValue.toLowerCase()));
      return{
        ...state,
        filteredData:searchedResult,
        searchedValue
      }
    }
    case TodoActions.SORT_BY_SUMMARY: {
      return {
        ...state,
        todoList: state.todoList.slice().sort((a, b) => {
          if (action.payload.isAsscending) {
            return "" + a.title.localeCompare(b.title);
          }
          return "" + b.title.localeCompare(a.title);
        }),
      };
    }
    case TodoActions.SORT_BY_PRIORITY: {
      return {
        ...state,
        todoList: state.todoList.slice().sort((a, b) => {
          if (action.payload.isAsscending) {
            return a.priority - b.priority;
          }
          return b.priority - a.priority;
        }),
      };
    }
    case TodoActions.SORT_BY_CREATEDAT: {
      return {
        ...state,
        todoList: state.todoList.slice().sort((a, b) => {
          if (action.payload.isAsscending) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
        }),
      };
    }
    case TodoActions.SORT_BY_DUE_DATE: {
      return {
        ...state,
        todoList: state.todoList.slice().sort((a, b) => {
          if (action.payload.isAsscending) {
            return new Date(a.dueDate) - new Date(b.dueDate);
          }
          return new Date(b.dueDate) - new Date(a.dueDate);
        }),
      };
    }

    default:
      return state;
  }
}

export default TodoReducer;
