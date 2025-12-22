package backend.DataLayer.protocol.Account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//Router Layer
@RestController
@RequestMapping("/account") // Đường dẫn cơ sở cho tất cả các API trong controller này
public class AccountController {

    private final AccountDAO personRepo;

    @Autowired
    public AccountController(AccountDAO personRepo) {
        this.personRepo = personRepo;
    }

    // SỬA LỖI 1: Sử dụng PathVariable để xác định tài nguyên cụ thể.
    // Đường dẫn đúng: /person/1

    @GetMapping("/test")
    public String test() {
        return "test";
    }

    // SỬA LỖI 2: Tạo một endpoint riêng và rõ ràng hơn để lấy tên.
    // Đường dẫn đúng: /person/1/name
    @GetMapping("/{id}/name")
    public ResponseEntity<String> getPersonNameById(@PathVariable("id") Integer id) {
        // Get account by identity ID and return associated person's full name
        return personRepo.findByPersonIdentityId(id)
                .map(account -> ResponseEntity.ok(
                        account.getIdentity() != null ? account.getIdentity().getFirstName() : "No name"))
                .orElse(ResponseEntity.notFound().build());
    }


}