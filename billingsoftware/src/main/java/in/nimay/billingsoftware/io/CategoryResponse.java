package in.nimay.billingsoftware.io;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
@Data
@Builder
public class CategoryResponse {
    private String name;
    private String description;
    private String bgColor;
    private String categoryId;
    private String categoryName;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String imageUrl;

}
