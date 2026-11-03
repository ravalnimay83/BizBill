package in.nimay.billingsoftware.service.impl;

import in.nimay.billingsoftware.entity.CategoryEntity;
import in.nimay.billingsoftware.entity.ItemEntity;
import in.nimay.billingsoftware.io.ItemRequest;
import in.nimay.billingsoftware.io.ItemResponse;
import in.nimay.billingsoftware.repository.CategoryRepository;
import in.nimay.billingsoftware.repository.ItemRepository;
import in.nimay.billingsoftware.service.FileUploadService;
import in.nimay.billingsoftware.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final FileUploadService fileUploadService;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        String imgUrl = fileUploadService.uploadFile(file);
        ItemEntity newItem = convertToEntity(request);
        CategoryEntity existingCategory = categoryRepository.findById(request.getCategoryId())
                .orElse(()=> new RuntimeException("Catregory not found"+request.getCategoryId()));
        newItem.setCategory(existingCategory);
        newItem.setImgUrl(imgUrl);
        newItem =  itemRepository.save(newItem);
        convertToResponse(newItem);
    }

    private void convertToResponse(ItemEntity newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .imageUrl(newItem.getImgUrl())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .build();
    }

    private ItemEntity convertToEntity(ItemRequest request) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }

    @Override
    public List<ItemResponse> fetchItem() {
        return List.of();
    }

    @Override
    public void deleteItem(String itemId) {

    }
}
