import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class AddTask extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        #newTaskInput {
          width: 100%;
        }
        #addBtn {
          width: 120px;
        }
      </style>

      <paper-input label="Enter Task" id="newTaskInput"></paper-input>
      <paper-button raised id="addBtn" on-click="onAddTask">Add task</paper-button>
    `;
  }

  onAddTask() {
    let taskLabel = this.$.newTaskInput.value;
    this.dispatchEvent(new CustomEvent('task-added', {detail: {label: taskLabel, status: "Created"}}, {bubbles: true, composed: true}));
    this.$.newTaskInput.value = '';
  }
}

window.customElements.define('add-task', AddTask);
