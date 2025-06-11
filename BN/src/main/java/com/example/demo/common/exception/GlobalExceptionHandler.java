package com.example.demo.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.*;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {
        List<Map<String, String>> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> {
                    Map<String, String> err = new HashMap<>();
                    err.put("field", error.getField());
                    err.put("message", error.getDefaultMessage());
                    return err;
                })
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("status", 400);
        response.put("errors", errors);
        response.put("message", "Validation failed");

        return ResponseEntity.badRequest().body(response);
    }
}
