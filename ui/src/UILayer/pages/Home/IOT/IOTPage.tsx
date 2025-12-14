
import React, { useContext } from 'react';
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { useRootStore } from '../../../../OrchestraLayer/StateManager/MobX/RootStore';
import { observer } from 'mobx-react-lite';
import IOTSessionIcon from './IOTSessionIcon';
import { useActorRef, useSelector } from '@xstate/react';
import { ChangeIOTSessionActor } from '../../../../OrchestraLayer/StateManager/XState/ChangeIOTSession';

// Define a simple IOT Store for this page if needed, or use RootStore
// For now, let's assume we might extend root store later, 
// or just use local state for demo purposes + root store for user info.

const IOTPage = observer(() => {
    const { userProfileStore } = useRootStore();


    const changeSession = ChangeIOTSessionActor.useActorRef();
    // var state;
    var room:string=useSelector(changeSession, (snapshot) => snapshot.value);
    // changeSession.subscribe((state) => {
    //     console.log("IOTPage | State:", state.value);
    //    room =state.value;
    // })
    return (
        <div className="flex w-full max-w-7xl min-h-screen">

            <div className='flex-1 bg-blue-700'>
                <IOTSessionIcon
                    title="My Room"
                    icon=""
                    onClick={() => { changeSession.send({ type: "ROUTE", target: "onSubRoom" }) }}
                />
                <IOTSessionIcon
                    title="Sub Room"
                    icon=""
                    onClick={() => { changeSession.send({ type: "ROUTE", target: "onMyRoom" }) }}
                />
            </div>
            <div className='flex-11 bg-blue-200'>


                <div className="">
                    <Typography variant="h2" className="text-gray-900 font-bold mb-2">
                        IOT Dashboard
                    </Typography>
                    <Typography className="text-gray-600">
                        Welcome back, {userProfileStore.profile.name}. Here is your smart home status.
                    </Typography>
                    {room === "onMyRoom" ? <MyRoom /> : <SubRoom />}
                </div>


            </div>
        </div>
    );
});

const MyRoom: React.FC = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                {/* Mock IOT Cards */}
                <DeviceCard name="Living Room Light" status="On" />
                <DeviceCard name="Kitchen Thermostat" status="24°C" />
                <DeviceCard name="Front Door" status="Locked" />
                <DeviceCard name="System Status" status="Nominal" />
            </div>
        </div>
    )
}

const SubRoom: React.FC = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                {/* Mock IOT Cards */}
                <DeviceCard name="Sub Room Light" status="On" />
                <DeviceCard name="Sub Room Thermostat" status="24°C" />
                <DeviceCard name="Sub Room Door" status="Locked" />
                <DeviceCard name="Sub Room Status" status="Nominal" />
            </div>
        </div>
    )
}


const DeviceCard = ({ name, status }: { name: string, status: string }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {name}
                </Typography>
                <Typography>
                    Status: <span className="font-semibold text-blue-500">{status}</span>
                </Typography>
                <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outlined">Toggle</Button>
                    <Button size="sm" variant="text">Settings</Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default IOTPage;
