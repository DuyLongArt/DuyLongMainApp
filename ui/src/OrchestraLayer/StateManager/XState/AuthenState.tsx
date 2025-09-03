import { createActorContext, useMachine } from "@xstate/react";
import { AnyEventObject, assign, createMachine } from "xstate";

const authenState = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFmAdgZXWXTADoB7HAQQ2xwGI8BVAIQFkBJAFQG0AGAXUSgADmVgBLdOIpCQAD0QAmAOwBmEgE5lANgCs2gIy8V23ge0AaEAE9EB3RpK7VG3qa0aNigBzGAvn5WaFi4BESkFNQh9ExsXNwGgkggohJSMskKCAAsiiS8BYVFhQZWtgjeBiTZnp7Kiry6iqq+GgGBIDhkEHCywbRhxLKpktI4slkAtLqatXPzGqpliJPaAUE0oYTE5FSb48kj6QegWRraJC5uDcrKNQY1ussIBt7qvMqViop6hgX66xA-S24V2YQATuhhmJRhlTohsqoqtlvIjlLxsgYXNoljY7JUSN4fA9PopzDo2u0gA */
    id: "authenState",
    initial: "onInit",
    context:{
        username:"",
        password:"",
        token:""
    },
    
    states: {
        onInit:{
            always:{
                target:"onAuthen"
            }
        },
        onAuthen: {
    on: {
        // Mình quay lại dùng mảng [] như ban đầu của chủ nhân nha!
        // Nó rất mạnh mẽ để xử lý các trường hợp khác nhau.
       
        SUBMIT: [
          {
            target: 'onLogin',

            actions:
             assign({token:(event)=>{event.data}}),
         

            // XState v5
            guard: ({ event }) =>
              event?.username === 'admin@ss' && event?.password === '123',
          },
          {
            target: 'onAuthen',
            actions: () => {
              console.log('Thông tin sai rùi!');
            }
          }
        ]
    }
},
onLogin: {
    // type: "final",
    // entry: () => {
    //     console.log("Authen is pass and now in action");
    // }
},   
    }
    
},);


const AuthContext = createActorContext(authenState);

export { authenState ,AuthContext};