package in.nimay.billingsoftware.controller;

import in.nimay.billingsoftware.io.CategoryRequest;
import in.nimay.billingsoftware.io.CategoryResponse;
import in.nimay.billingsoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.thirdparty.jackson.core.JsonProcessingException;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ControllerCategory {
    private final CategoryService categoryService;


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart("category") String categoryString,
                                        @RequestPart("file") MultipartFile file)
    {
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryRequest request = null;
        try{
            request = objectMapper.readValue(categoryString, CategoryRequest.class);
            return categoryService.add(request,file);
        }catch(JsonProcessingException ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception while parsing the Json:"+ex.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    @GetMapping
    public List<CategoryResponse> fetchCategories()
    {
        return categoryService.read();
    }
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{categoryId}")
        public void remove(@PathVariable String categoryId){
        try{
            categoryService.delete(categoryId);
        }
        catch(Exception ex){throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage()+"Catrgory not found:"+categoryId);}
    }
}
