package duylong.art.javabackend.Person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/person") // Đường dẫn cơ sở cho tất cả các API trong controller này
public class PersonController {

    private final PersonRepo personRepo;

    @Autowired
    public PersonController(PersonRepo personRepo) {
        this.personRepo = personRepo;
    }

    // SỬA LỖI 1: Sử dụng PathVariable để xác định tài nguyên cụ thể.
    // Đường dẫn đúng: /person/1
    @GetMapping("/{id}")
    public String getPersonById(@PathVariable("id") Integer id) {
        return personRepo.findNameById(id);
    }

    // SỬA LỖI 2: Tạo một endpoint riêng và rõ ràng hơn để lấy tên.
    // Đường dẫn đúng: /person/1/name
    @GetMapping("/{id}/name")
    public ResponseEntity<String> getPersonNameById(@PathVariable("id") Integer id) {
        String name = personRepo.findNameById(id);
        if (name != null) {
            return ResponseEntity.ok(name); // Nếu tìm thấy, trả về 200 OK và tên
        } else {
            return ResponseEntity.notFound().build(); // Nếu không, trả về 404 Not Found
        }
    }
}