import { act, renderHook } from "@testing-library/react-native";
import { useAuth } from "./auth";
import { Providers } from "../utils/tests";

jest.mock("expo-auth-session");

describe("Auth Hook", () => {  it("should be able to sign in with Google account.", async () => {
    require("expo-auth-session").startAsync.mockResolvedValue({
      type: "success",
      params: { access_token: "google-token" },
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: "any_id",
            email: "giovani@email.com",
            given_name: "Giovani",
            picture: "any_photo.png",
          }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useAuth(), { wrapper: Providers });

    await act(() => {
      result.current.signInWithGoogle();
    });

    expect(result.current.user.id).toBe("any_id");
    expect(result.current.user.email).toBe("giovani@email.com");
    expect(result.current.user.name).toBe("Giovani");
    expect(result.current.user.photo).toBe("any_photo.png");
  });

  it("should not connect if cancel authentication with Google account.", async () => {
    require("expo-auth-session").startAsync.mockResolvedValue({
      type: "error",
      params: {},
    });

    const { result } = renderHook(() => useAuth(), { wrapper: Providers });

    await act(() => {
      result.current.signInWithGoogle();
    });

    expect(result.current.user).not.toHaveProperty("id");
  });
});
