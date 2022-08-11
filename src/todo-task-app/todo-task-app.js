import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { MutableData } from '@polymer/polymer/lib/mixins/mutable-data.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import './edit-task.js';
import './add-task.js';

/**
 * @customElement
 * @polymer
 */
class TodoTaskApp extends MutableData(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        header {
          text-align: center;
          text-transform: uppercase;
        }
        #taskContainer {
          width: 100%;
        }
        #addTask {
          display: flex;
          flex-direction: row;
          width: 100%;
        }
      </style>

      <header id="header">
        <h2>Todo Application</h2>
      </header>
      <paper-card heading="All Tasks" elevation="1" animated-shadow="false" id="taskContainer">
        <div class="card-actions" id="addTaskAction">
          <add-task id="addTask"></add-task>
        </div>
        <div class="card-content">
          <template is="dom-repeat" items={{tasks}} as=task index-as=index mutable-data>
            <!-- {{task}} and {{index}} can be used in this binding scope -->
        
            <paper-card elevation="1" animated-shadow="false">
              <div class="card-content">
                <p>Task: <span>{{task.label}}</span></p>
                <p>Status: <span>{{task.status}}</span></p>
              </div>
              <div class="card-actions">
                <paper-button raised on-click="editDialogOpen">Edit</paper-button>
                <paper-button raised on-click="deleteTask">Delete</paper-button>
              </div>
            </paper-card>
          </template>
        </div>
      </paper-card>
      
      <edit-task id="editTask" is-dialog-open="{{isDialogOpen}}" task-data="{{taskEdit}}"></edit-task>
    `;
  }

  constructor() {
    super();
    this.isDialogOpen = false;
  }

  static get properties() {
    return {
      tasks: {
        type: Array,
        value: () => [{label: "Task1", status: "In-Progress"}],
        notify: true
      },
      taskEdit: {
        type: Object,
        value: {label: "Task1", status: "In-Progress"}
      },
      taskEditIndex: {
        type: Number,
        value: 0
      }
    };
  }

  addTask(e) {
    if(e.detail) {
      let task = e.detail;
      this.push('tasks', task);
    }
  }

  editTask(e) {
    let path = 'tasks.' + this.taskEditIndex;
    this.set(path, this.taskEdit);
    this.notifyPath(path);
  }

  deleteTask(e) {
    let index = e.model.index;
    this.splice('tasks', index, 1);
  }

  editDialogOpen(e) {
    this.taskEditIndex = e.model.index;
    this.taskEdit = e.model.task;
    this.isDialogOpen = true;
  }

  ready() {
    super.ready();
    this.$.editTask.addEventListener('task-changed', e => {this.editTask(e);});
    this.$.addTask.addEventListener('task-added', e => {this.addTask(e);});
  }
}

window.customElements.define('todo-task-app', TodoTaskApp);
