//package com.jobzey.backend.config;
//
//
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.ClassPathResource;
//
//import java.io.FileInputStream;
//import java.io.IOException;
//
//@Configuration
//public class FirebaseConfig {
//
//    @Value("${firebase.service.account.path}")
//    private String serviceAccountPath;
//
//    //firebase
//
//    @PostConstruct
//    public void initializeFirebase() throws IOException {
//        if(FirebaseApp.getApps().isEmpty()){
//
//            ClassPathResource serviceAccount = new ClassPathResource("firebase-service-account.json");
//
//            FirebaseOptions options = FirebaseOptions.builder()
//                    .setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream()))
//                    .build();
//
//            FirebaseApp.initializeApp(options);
//            System.out.println("Fire Base app is initialize successfully"); //Hello
//        }
//    }
//}

package com.jobzey.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    private static final String FIREBASE_SECRET_PATH =
            "/etc/secrets/firebase-service-account.json";

    @PostConstruct
    public void initializeFirebase() throws IOException {

        if (FirebaseApp.getApps().isEmpty()) {

            InputStream serviceAccount =
                    new FileInputStream(FIREBASE_SECRET_PATH);

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);

            System.out.println("Firebase initialized successfully");
        }
    }
}