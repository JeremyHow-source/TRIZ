# Developer Guide: Publishing to Google Play Store & Apple App Store

This guide details the step-by-step workflow for taking the native projects in your workspace (`triz-contradiction-mapper/android/` and `triz-contradiction-mapper/ios/`) and publishing them to the official Google and Apple marketplaces.

---

## 🛠️ Step 1: Generate App Assets (Icons & Splash Screens)
Before publishing, you need icons and splash screens in multiple resolutions. Capacitor provides a command-line tool (`@capacitor/assets`) that takes a single icon image and automatically scales it for all Android and iOS resolutions.

### How to use it:
1. Create a temporary high-resolution source file at the project root `triz-contradiction-mapper/`:
   * `assets/icon.png` (Must be at least `1024x1024` px)
   * `assets/splash.png` (Must be at least `2732x2732` px)
2. Run these commands in your project terminal:
   ```bash
   npm install @capacitor/assets --save-dev
   npx capacitor-assets generate
   ```
   *This automatically populates the appropriate folders in both `android/app/src/main/res/` and `ios/App/App/Assets.xcassets/` with correct image sizes.*

---

## 🤖 Step 2: Publishing to Google Play Store (Android)

### Prerequisites:
* A Google Play Console Developer Account ($25 one-time registration fee: [Register here](https://play.google.com/console/signup)).
* [Android Studio](https://developer.android.com/studio) installed on your machine.

### Step-by-Step Instructions:

1. **Open the Project in Android Studio**:
   Open a terminal in `triz-contradiction-mapper` and run:
   ```bash
   npm run build
   npm run cap:sync
   npm run cap:open:android
   ```
   *Android Studio will launch and synchronize the Gradle files.*

2. **Generate a Signed Release Bundle**:
   * In Android Studio, select **Build** ➔ **Generate Signed Bundle / APK...** from the top menu.
   * Choose **Android App Bundle (AAB)** (required by Google Play for uploads) and click **Next**.
   * Click **Create new...** under *Key store path* to generate a secure signature key (keystore):
     * Choose a location on your computer to save the keystore file (e.g. `release-key.jks`).
     * Set a strong password and write it down.
     * Fill in the certificate details (First/Last name, Organization) and click **OK**.
   * Click **Next**, select the **release** build variant, and click **Create** / **Finish**.
   * *Android Studio will compile your code and compile an `.aab` file located in `android/app/release/app-release.aab`.*

3. **Upload to Google Play Console**:
   * Log into your [Google Play Console](https://play.google.com/console).
   * Click **Create app** and fill in your app details (App name, Default language, Free/Paid status).
   * Go to **Release** ➔ **Production** (or **Testing** ➔ **Internal testing** if you want to test with a small group first).
   * Click **Create new release** and drag & drop the `app-release.aab` file you created.
   * Complete the Store Presence metadata:
     * App description, privacy policy link, content ratings.
     * **Upload Store Assets**: Upload at least two screenshots of the app, an icon (`512x512` px), and a feature graphic banner (`1024x500` px).
   * Click **Review release** ➔ **Start roll-out to Production** to submit your app for review! (Google typically takes 2–5 days to review new developer apps).

---

## 🍎 Step 3: Publishing to Apple App Store (iOS)

### Prerequisites:
* An Apple Developer Program Account ($99/year subscription fee: [Register here](https://developer.apple.com/programs/)).
* A Mac running macOS with [Xcode](https://developer.apple.com/xcode/) installed.

### Step-by-Step Instructions:

1. **Open the Project in Xcode**:
   Open a terminal on your Mac in `triz-contradiction-mapper` and run:
   ```bash
   npm run build
   npm run cap:sync
   npm run cap:open:ios
   ```
   *Xcode will launch with the workspace structure loaded.*

2. **Configure App Signing & Certificates**:
   * In Xcode, click the **App** project item in the left-hand sidebar (top item).
   * Select the **Signing & Capabilities** tab in the main editor panel.
   * Check the box for **Automatically manage signing**.
   * Click the **Team** dropdown and select your Apple Developer account/team name. 
   * *Xcode will automatically generate your App Store provisioning profiles and signing certificates.*

3. **Register App on App Store Connect**:
   * Go to [App Store Connect](https://appstoreconnect.apple.com/) on your browser.
   * Click **My Apps** ➔ **+** ➔ **New App**.
   * Choose **iOS**, enter your App Name, select the matching Bundle ID (e.g. `com.siliconresolve.triz`), and click **Create**.

4. **Archive and Upload from Xcode**:
   * In Xcode, look at the top menu bar target selector (next to the play/stop buttons). Set the destination to **Any iOS Device (arm64)** (do not select an emulator).
   * From the top menu bar, select **Product** ➔ **Archive**.
   * *Xcode will build a production-ready package. Once complete, the **Organizer** window will open.*
   * Select the build archive and click **Distribute App** (on the right-side panel).
   * Select **App Store Connect** ➔ **Upload** ➔ click **Next** and follow the prompts.
   * *Xcode will compile and upload the bundle directly to App Store Connect.*

5. **Submit for App Store Review**:
   * Go back to your [App Store Connect](https://appstoreconnect.apple.com/) dashboard.
   * Select your app. Under **iOS App** ➔ **Prepare for Submission**:
     * Fill in app screenshots (Apple requires specific sizes for iPhone screen sizes like 6.5" and 5.5").
     * Fill in App Description, Keywords, Support URL, Privacy Policy, and Age Rating.
   * Under **Build**, click **+** and select the build uploaded from Xcode.
   * Click **Submit for Review** in the top right! (Apple's review typically takes 24–48 hours).
