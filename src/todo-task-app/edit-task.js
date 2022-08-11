import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu-light.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

/**
 * @customElement
 * @polymer
 */
class EditTask extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
            display: block;
        }
      </style>

      <paper-dialog id="editTaskDialog" on-iron-overlay-closed="onCancel">
        <h2>Edit Task</h2>
        <div id="editTaskAction">
          <paper-input label="Task" value="{{taskData.label}}" id="editTaskInput"></paper-input>
          <paper-dropdown-menu-light label="Status" value="{{taskData.status}}">
            <!--
              support hybrid mode: 
              paper-dropdown-menu-light 1.x distributes via <content select=".dropdown-content">
              paper-dropdown-menu-light 2.x distributes via <slot name="dropdown-content">
            -->
            <paper-listbox class="dropdown-content" slot="dropdown-content">
              <paper-item>Created</paper-item>
              <paper-item>In-Progress</paper-item>
              <paper-item>Done</paper-item>
              <paper-item>Re-Open</paper-item>
            </paper-listbox>
          </paper-dropdown-menu-light>
        </div>
        <div class="buttons">
          <paper-button dialog-dismiss on-click="onCancel">Cancel</paper-button>
          <paper-button dialog-confirm autofocus on-click="onSubmit">Submit</paper-button>
        </div>
      </paper-dialog>
    `;
  }

  static get properties() {
      return {
        taskData: {
          type: Object,
          value: {label: "", status: ""}
        },
        isDialogOpen: {
          type: Boolean,
          value: false,
          notify: true,
          observer: "_isDialogChanged"
        }
      };
  }

  _isDialogChanged(newValue, oldValue) {
    if (newValue) {
      this.$.editTaskDialog.open();
    }
  }

  onCancel() {
    this.isDialogOpen = false;
  }

  onSubmit() {
    this.isDialogOpen = false;
    this.dispatchEvent(new CustomEvent('task-changed', {bubbles: true, composed: true}));
  }
}

window.customElements.define('edit-task', EditTask);