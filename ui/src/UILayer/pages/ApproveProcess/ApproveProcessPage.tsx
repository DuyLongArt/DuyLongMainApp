import React from 'react';
import { useMachine } from '@xstate/react';
import { ApproveProcessMachine } from '../../../OrchestraLayer/StateManager/XState/ApproveProcessMachine';
import { Box, Button, Stepper, Step, StepLabel, Typography, Paper, Container } from '@mui/material';
import { motion } from 'framer-motion';

const steps = ['Initialization', 'Verification', 'Approval', 'Finalization'];

const ApproveProcessPage: React.FC = () => {
    const [state, send] = useMachine(ApproveProcessMachine);

    // Calculate active step based on context.step
    // context.step is 1-based (1, 2, 3, 4)
    // activeStep is 0-based for MUI Stepper
    const activeStep = state.context.step - 1;

    const isApproved = state.matches('onApproved');
    const isRejected = state.matches('onReject');
    const isInit = state.matches('onInit');

    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                    Process Flow
                </Typography>

                <Stepper activeStep={isApproved ? 4 : activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '200px', justifyContent: 'center' }}>
                    {isApproved ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <Typography variant="h5" color="success.main">Process Completed Successfully!</Typography>
                        </motion.div>
                    ) : isRejected ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <Typography variant="h5" color="error.main">Process Rejected</Typography>
                        </motion.div>
                    ) : (
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Current State: {typeof state.value === 'string' ? state.value : JSON.stringify(state.value)}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {isInit ? 'Ready to start the process.' : `Step ${state.context.step} is in progress...`}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    {!isApproved && !isRejected && (
                        <>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => send({ type: 'REJECT' })}
                                disabled={isInit} // Maybe allow reject at init?
                            >
                                Reject
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => send({ type: 'APPROVE' })}
                            >
                                {isInit ? 'Start Process' : (activeStep === 3 ? 'Complete' : 'Next Step')}
                            </Button>
                        </>
                    )}
                    {(isApproved || isRejected) && (
                        <Button
                            variant="text"
                            onClick={() => window.location.reload()}
                        >
                            Reset
                        </Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default ApproveProcessPage;
