# Fix "externalOverride" / packageRelease signing errors in Android Studio

If you see errors like:
- **Keystore file 'C:\Users\rtayl\Desktop\Apk\PepTalk' not found**
- **keystore password was incorrect** / **Failed to read key peptalk from store**

Android Studio has a **signing override** pointing at that path. Clear it so the build uses the debug keystore (or your real release keystore).

## Steps (Android Studio)

1. **Run → Edit Configurations**
2. In the left list, select your **app** run configuration (e.g. "app").
3. Look for **Installation** or **Deploy** or **Signing** (or similar).
4. If you see **"Use custom keystore"** or a path like `C:\Users\rtayl\Desktop\Apk\PepTalk`:
   - Uncheck **Use custom keystore**, or
   - Clear the path / remove the signing override.
5. Click **Apply** → **OK**.
6. **Build → Build Bundle(s) / APK(s) → Build APK(s)** again.

The release APK will be signed with the **debug** keystore (fine for testing). For Play Store, use **Build → Generate Signed Bundle / APK** and choose a real release keystore.

## Optional: delete the bad file

If a file was created at `C:\Users\rtayl\Desktop\Apk\PepTalk`, you can delete it (and the `Apk` folder if it’s empty). It’s not needed once the override is cleared.
