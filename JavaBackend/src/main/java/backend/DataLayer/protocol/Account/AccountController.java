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
    @GetMapping("/{alias}")
    public String getPersonById(@PathVariable("alias") String alias) {

        String aliasResult = personRepo.findAccountByAlias(alias);
        if (alias == null) {
            return "No such alias";
        } else {
            return alias;
        }

    }
    @GetMapping("/test")
    public String test() {
        return "test";
    }

    // SỬA LỖI 2: Tạo một endpoint riêng và rõ ràng hơn để lấy tên.
    // Đường dẫn đúng: /person/1/name
    @GetMapping("/{alias}/name")
    public ResponseEntity<String> getPersonNameById(@PathVariable("id") Integer id) {
        String name = personRepo.findNameById(id);
        if (name != null) {
            return ResponseEntity.ok(name); // Nếu tìm thấy, trả về 200 OK và tên
        } else {
            return ResponseEntity.notFound().build(); // Nếu không, trả về 404 Not Found
        }
    }

    @PostMapping("/registation")
    public ResponseEntity<String> registation(
            @RequestBody backend.DataLayer.protocol.Credential.RegistrationCredential credential) {
        // TODO: Implement registration logic
        return ResponseEntity.ok("Registration implementation pending");
    }
}