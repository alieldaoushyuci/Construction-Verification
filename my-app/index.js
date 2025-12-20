/**
 * Entry point for the Expo app
 *
 * This file is required by Expo to register your app component as the root component.
 * It ensures the app works correctly in Expo Go, native builds, and web.
 *
 * The registerRootComponent function:
 * - Registers the App component with React Native's AppRegistry
 * - Sets up the appropriate environment for different platforms
 * - This is the first file that runs when your app starts
 */

import { registerRootComponent } from "expo";
import App from "./App";

registerRootComponent(App);
