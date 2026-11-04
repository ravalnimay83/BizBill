package in.nimay.billingsoftware.service;

import in.nimay.billingsoftware.io.ItemRequest;
import in.nimay.billingsoftware.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);
    List<ItemResponse> fetchItem();
    void deleteItem(String itemId);
    ItemResponse updateItem(String itemId, ItemRequest request, MultipartFile file);

}
