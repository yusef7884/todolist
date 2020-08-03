// class Knight {
//     constructor(index) {
//       this.name = `Knight #${index}`;
//       this.healthPoint = 100;
//       this.next = null;
//     }
  
//     setNext(next) {
//       this.next = next;
//     }
//   }
  
//   const k1 = new Knight(1);
//   const k2 = new Knight(2);
//   const k3 = new Knight(3);
//   const k4 = new Knight(4);
//   const k5 = new Knight(5);
//   const k6 = new Knight(6);
  
//   k1.setNext(k2);
//   k2.setNext(k3);
//   k3.setNext(k4);
//   k4.setNext(k5);
//   k5.setNext(k6);
//   k6.setNext(k1);

//   const rand = () => Math.floor(Math.random() * 6) + 1;

//   k1.next.healthPoint = k1.next.healthPoint() *6
  
//   console.log(k1);
// let counter=0 ;
// function createCounter() {
//   const myFun = function() {
//     counter = counter + 1;
//     return counter;
//   }
//   return myFun;
// }

// const inc = createCounter();

// const id = setTimeout(function(){
//   let x = inc();
//   console.log(x);
// },2000);
// clearTimeout
//   class Car {
//        constructor(maker) {
//            this.maker = maker;
//        }

//        getMaker() {
//            return this.maker;
//        }

//        static methodName() {
//            console.log('static member')
//        }
//   }

//    class Shape {
//        constructor(name) {
//            this.name = name;
//        }

//        printName() {
//            console.log(this.name)
//        } 
//    }

//    class Circle extends Shape {
//     constructor(radius) {
//         super('circle');
//         this.radius = radius;
//     }
//    }
//    area() {
//        return this.radius * this.radius * 3.14
//    }
//     class Circle extends Shape {
//     constructor(radius) {
//         super('circle');
//         this.radius = radius;
//     }

//    class Rectangel extends Shape {
//     constructor(width, hight) {
//         super('Rectangle');
//         this.width = width;
//         this.hight = hight;
//     }
//    }

//    const x = new Shape('cercle')
//    x.printName();
class Task {
    constructor(name) { 
        this.name = name;
        this.id = Math.random();
        this.completed = false;
    }

    complete() {
        this.completed = true;
    }

    undo() {
        this.completed = false;
    }
}
  
class TodoList {
    constructor()  {
        this.tasks = [];
    }
    add(name) {
        const task = new Task(name);
        this.tasks.push(task);
    }

    remove (id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if(index !== -1) {
            this.tasks.splice(index, 1);
        }
    }
}


function ElementBuilder(name) {
    this.element = document.createElement(name)

    this.text = function (text) {
        this.element.textContent = text
        return this
    }

    this.type = function (type) {
        this.element.type = type
        return this
    }

    this.appendTo = function (parent) {
        if (parent instanceof ElementBuilder) {
            parent
                .build()
                .appendChild(this.element)
        } else {
            parent.appendChild(this.element)
        }
        return this
    }

    this.placeholder = function (text) {
        this.element.placeholder = text
        return this
    }

    this.hide = function () {
        this.element.style.display = 'none'
        return this
    }

    this.show = function () {
        this.element.style.display = 'block'
        return this
    }

    this.className = function (className) {
        this.element.className = className
        return this
    }

    this.onclick = function (fn) {
        this.element.onclick = fn
        return this
    }

    this.html = function(htmlvalue) {
        this.element.innerHTML = htmlvalue
        return this
    }

    this.value = function(value){
        this.element.value = value
        return this
    }

    this.build = function () {
        return this.element
    }
}

const builder = {
    create: function (name) {
        return new ElementBuilder(name)
    }
}

class TodoListApp {
    constructor(input,addButton, listContainer) {
        this.todoList = new TodoList();
        this.input = input; 
        this.addButton = addButton;
        this.list = listContainer;
    }

    init() {
        this.addButton.addEventListener('click', () => {
            const name = this.input.value;
            this.todoList.add(name);
            this.paint();
            this.input.value = '';
        });
    }

    paint () {
        this.list.innerHTML = '';
        this.todoList.tasks.forEach(task => {
            const li = builder
            .create('li')
            .text(task.name)
            .onclick(() => {
                if(task.completed) {
                    task.undo();
                }
                else {
                    task.complete();
                }
                this.paint();
            })
            .appendTo(this.list);
            if(task.completed) {
              li.className('checked')
            }
          builder
            .create('span')
            .text('x')
            .className('close')
            .onclick(() => {
                this.todoList.remove(task.id);
                this.paint();
            })
            .appendTo(li);
        });
    }
}
const app = new TodoListApp(
    document.getElementById('myInput'),
    document.getElementById('addBtn'),
    document.getElementById('myUL')
);
app.init();