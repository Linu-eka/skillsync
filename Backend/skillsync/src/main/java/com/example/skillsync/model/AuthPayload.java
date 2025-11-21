package com.example.skillsync.model;
import lombok.Data;
import com.example.skillsync.model.User;

@Data
public class AuthPayload {
  private User user;
  private String token;

    public AuthPayload(User user, String token) {
        this.user = user;
        this.token = token;
    }
}
