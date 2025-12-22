package backend.DataLayer.protocol.IOT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApproveProcessServices {

    @Autowired
    private ApprovalDAO approvalDAO;

    /**
     * Automatically finds the next 'Waiting' (1) step and updates it.
     * Throws an exception if the process is already Rejected (3) or fully Completed.
     */
    @Transactional
    public ApprovalRequest processNextStep(Long requestId, boolean isApproved) {
        // 1. Fetch the request
        ApprovalRequest request = approvalDAO.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        List<Integer> steps = request.getSteps();
        int targetIndex = -1;

        // 2. LOGIC: Scan to find the active step
        for (int i = 0; i < steps.size(); i++) {
            int status = steps.get(i);

            // STOP CONDITION: If we hit a Rejected (3) step, the whole process is dead.
            // You cannot approve step 4 if step 3 was rejected.
            if (status == 3) {
                throw new IllegalStateException("Process was terminated/rejected at Step " + (i + 1));
            }

            // ACTION CONDITION: Found the first "Waiting" (1) step.
            if (status == 1) {
                targetIndex = i;
                break; // Stop looking, we found the step to process
            }

            // If status is 2 (Approved), the loop simply continues to the next step.
        }

        // 3. VALIDATION: Did we find a step to process?
        if (targetIndex == -1) {
            throw new IllegalStateException("Process is already fully completed (all steps approved).");
        }

        // 4. UPDATE
        // Map boolean to Status Code: true -> 2 (Approved), false -> 3 (Rejected)
        int newStatus = isApproved ? 2 : 3;

        steps.set(targetIndex, newStatus);

        // Save updates
        request.setSteps(steps);
        return approvalDAO.save(request);
    }
}