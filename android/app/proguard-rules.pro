# =============================
# React Native / Reanimated
# =============================
-keep class com.facebook.react.** { *; }
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
}

# =============================
# Firebase + Google Play
# =============================
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

-keep class com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

# =============================
# Gson / JSON
# =============================
-keep class com.google.gson.** { *; }
-dontwarn com.google.gson.**

# =============================
# Hermes (if enabled)
# =============================
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }
-dontwarn com.facebook.hermes.**

# =============================
# Expo Modules
# =============================
-keep class expo.modules.** { *; }

# =============================
# File Provider (storage/sharing)
# =============================
-keep class androidx.core.content.FileProvider { *; }

# =============================
# AndroidX / General
# =============================
-keep class androidx.** { *; }
-keep @androidx.annotation.Keep class * { *; }

# =============================
# OkHttp (used by Firebase + RN)
# =============================
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**

# =============================
# Misc
# =============================
-dontnote org.codehaus.mojo.animal_sniffer.*
-dontwarn org.codehaus.mojo.animal_sniffer.*