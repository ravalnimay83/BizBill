package in.nimay.billingsoftware.controller;

import in.nimay.billingsoftware.io.ItemRequest;
import in.nimay.billingsoftware.io.ItemResponse;
import in.nimay.billingsoftware.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class ItemController {

    private final ItemService itemService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = {"/admin/items", "/items"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ItemResponse addItemMultipart(
            @RequestPart(value = "item", required = false) String itemString,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "file", required = false) MultipartFile paramFile,
            @RequestParam(value = "image", required = false) MultipartFile paramImage,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "price", required = false) BigDecimal price,
            @RequestParam(value = "categoryId", required = false) String categoryId) {

        MultipartFile actualFile = file != null ? file : (image != null ? image : (paramFile != null ? paramFile : paramImage));

        ItemRequest itemRequest;
        if (itemString != null && !itemString.isBlank()) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                itemRequest = objectMapper.readValue(itemString, ItemRequest.class);
            } catch (Exception ex) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception while processing JSON: " + ex.getMessage());
            }
        } else {
            itemRequest = ItemRequest.builder()
                    .name(name)
                    .description(description)
                    .price(price)
                    .categoryId(categoryId)
                    .build();
        }

        return itemService.add(itemRequest, actualFile);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = {"/admin/items", "/items"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ItemResponse addItemJson(@RequestBody ItemRequest itemRequest) {
        return itemService.add(itemRequest, null);
    }

    @GetMapping({"/items", "/admin/items"})
    public List<ItemResponse> readItems() {
        return itemService.fetchItem();
    }

    @PutMapping(value = {"/admin/items/{itemId}", "/items/{itemId}"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ItemResponse updateItemMultipart(
            @PathVariable("itemId") String itemId,
            @RequestPart(value = "item", required = false) String itemString,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "file", required = false) MultipartFile paramFile,
            @RequestParam(value = "image", required = false) MultipartFile paramImage,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "price", required = false) BigDecimal price,
            @RequestParam(value = "categoryId", required = false) String categoryId) {

        MultipartFile actualFile = file != null ? file : (image != null ? image : (paramFile != null ? paramFile : paramImage));

        ItemRequest itemRequest;
        if (itemString != null && !itemString.isBlank()) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                itemRequest = objectMapper.readValue(itemString, ItemRequest.class);
            } catch (Exception ex) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception while processing JSON: " + ex.getMessage());
            }
        } else {
            itemRequest = ItemRequest.builder()
                    .name(name)
                    .description(description)
                    .price(price)
                    .categoryId(categoryId)
                    .build();
        }

        return itemService.updateItem(itemId, itemRequest, actualFile);
    }

    @PutMapping(value = {"/admin/items/{itemId}", "/items/{itemId}"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ItemResponse updateItemJson(
            @PathVariable("itemId") String itemId,
            @RequestBody ItemRequest itemRequest) {
        return itemService.updateItem(itemId, itemRequest, null);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping({"/admin/items/{itemId}", "/items/{itemId}"})
    public void removeItem(@PathVariable("itemId") String itemId) {
        try {
            itemService.deleteItem(itemId);
        } catch (ResponseStatusException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found: " + ex.getMessage());
        }
    }

}
