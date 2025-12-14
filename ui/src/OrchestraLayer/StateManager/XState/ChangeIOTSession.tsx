import { createActorContext } from "@xstate/react";
import { setup } from "xstate";


const changeIOTSession = setup(
    {
        types: {

            context: {} as {
            },
            events: {} as {

                type: "ROUTE";
                target:string;

            }
        }
    }
).createMachine(

    {
        id: "changeIOTSessionMachine",
        initial: "onMyRoom",
        context: {},
        states: {
            onMyRoom: {
                on: {
                    ROUTE: {
                        target: "onSubRoom"
                    }
                }
            },
            onSubRoom: {
                on: {
                    ROUTE: {
                        // type: "iot",
                        target: "onMyRoom"
                    }
                }
            }
        }
    }
)

const ChangeIOTSessionActor = createActorContext(changeIOTSession);

export { changeIOTSession, ChangeIOTSessionActor }
