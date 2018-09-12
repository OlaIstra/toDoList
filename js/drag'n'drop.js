
 	let dragSrcEl = null;
  	export function handleDragStart(e) {
      // Target (this) element is the source node.
      this.style.opacity = '0.4';

      dragSrcEl = this;
   
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
      return true;
    }
    
    export function handleDragOver(e) {   
      event.preventDefault();
      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

      return false;
    }

    export function handleDrop(e) {     
      // Don't do anything if dropping the same place we're dragging.
      if (dragSrcEl != this) {
        this.appendChild(dragSrcEl);
      }
      return false;
    }

    export function handleDragEnd(e) {      
      this.style.opacity = '1';      
    }

    