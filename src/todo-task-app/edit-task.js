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

      <paper-dialog id="editTaskDialog" on-iron-overlay-closed="onEditDialogClose">
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
          <paper-button dialog-dismiss>Cancel</paper-button>
          <paper-button dialog-confirm autofocus on-click="onSubmit">Submit</paper-button>
        </div>
      </paper-dialog>
      <paper-dialog id="deleteTaskDialog" on-iron-overlay-closed="onDeleteDialogClose">
        <h2>Delete Task</h2>
        <p>Are you want to delete task?</p>
        <div class="buttons">
          <paper-button dialog-dismiss>No</paper-button>
          <paper-button dialog-confirm autofocus on-click="onClickYes">Yes</paper-button>
        </div>
      </paper-dialog>
    `;
  }

  static get properties() {
      return {
        taskData: {
          type: Object
        },
        isDialogOpen: {
          type: Boolean,
          notify: true,
          observer: "_isDialogChanged"
        },
        isDeleteDialogOpen: {
          type: Boolean,
          notify: true,
          observer: "_isDeleteDialogChanged"
        }
      };
  }

  _isDeleteDialogChanged(newValue, oldValue) {
    if (newValue) {
      this.$.deleteTaskDialog.open();
    }
  }

  _isDialogChanged(newValue, oldValue) {
    if (newValue) {
      this.$.editTaskDialog.open();
    }
  }

  onDeleteDialogClose() {
    this.isDeleteDialogOpen = false;
  }

  onClickYes() {
    this.dispatchEvent(new CustomEvent('task-deleted', {bubbles: true, composed: true}));
  }

  onEditDialogClose() {
    this.isDialogOpen = false;
  }

  onSubmit() {
    this.dispatchEvent(new CustomEvent('task-changed', {bubbles: true, composed: true}));
  }
}

window.customElements.define('edit-task', EditTask);