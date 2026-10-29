package in.nimay.billingsoftware.service;

import in.nimay.billingsoftware.io.CategoryRequest;
import in.nimay.billingsoftware.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request, MultipartFile file) throws IOException;
    List<CategoryResponse> read();
    void delete(String categoryId);
}
