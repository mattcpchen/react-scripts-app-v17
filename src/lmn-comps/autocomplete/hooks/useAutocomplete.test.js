import { renderHook, act } from "@testing-library/react-hooks";
import { useAutocomplete } from "./useAutocomplete";

describe("useAutocomplete hook", () => {
  const fetcher = jest.fn();
  const handleSelection = jest.fn();

  beforeEach(() => {
    fetcher.mockClear();
    handleSelection.mockClear();
  });

  it("should return the correct initial values", () => {
    const { result } = renderHook(() =>
      useAutocomplete(fetcher, handleSelection)
    );
    expect(result.current.value).toEqual("");
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.showSuggestions).toEqual(false);
    expect(result.current.selectedSuggestionIndex).toEqual(0);
  });

  it("should call the fetcher on value change", () => {
    const { result } = renderHook(() =>
      useAutocomplete(fetcher, handleSelection)
    );
    act(() => {
      result.current.onChange({ target: { value: "foo" } });
    });
    expect(fetcher).toHaveBeenCalledWith("foo");
  });

  it("should set the suggestions on fetcher success", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAutocomplete(fetcher, handleSelection)
    );
    fetcher.mockResolvedValueOnce(["foo", "bar"]);
    act(() => {
      result.current.onChange({ target: { value: "foo" } });
    });
    await waitForNextUpdate();
    expect(result.current.suggestions).toEqual(["foo", "bar"]);
  });

  it("should set showSuggestions to true if there are suggestions", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAutocomplete(fetcher, handleSelection)
    );
    fetcher.mockResolvedValueOnce(["foo", "bar"]);
    act(() => {
      result.current.onChange({ target: { value: "foo" } });
    });
    await waitForNextUpdate();
    expect(result.current.showSuggestions).toEqual(true);
  });

  it("should call the handleSelection on enter", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAutocomplete(fetcher, handleSelection)
    );
    fetcher.mockResolvedValueOnce(["foo", "bar"]);
    act(() => {
      result.current.onChange({ target: { value: "foo" } });
    });
    await waitForNextUpdate();
    act(() => {
      result.current.onKeyDown({ key: "Enter" });
    });
    expect(handleSelection).toHaveBeenCalledWith("foo");
  });

  it("should reset the suggestions on enter", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAutocomplete(fetcher, handleSelection)
    );
    fetcher.mockResolvedValueOnce(["foo", "bar"]);
    act(() => {
      result.current.onChange({ target: { value: "foo" } });
    });
    await waitForNextUpdate();
    act(() => {
      result.current.onKeyDown({ key: "Enter" });
    });
    expect(result.current.value).toEqual("");
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.showSuggestions).toEqual(false);
    expect(result.current.selectedSuggestionIndex).toEqual(0);
  });

  it("should wrap to the bottom on arrow up", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAutocomplete(fetcher, handleSelection)
    );
    fetcher.mockResolvedValueOnce(["foo", "foo2", "foo3"]);
    act(() => {
      result.current.onChange({ target: { value: "foo" } });
    });
    await waitForNextUpdate();
    act(() => {
      result.current.onKeyDown({ key: "ArrowUp" });
    });
    expect(result.current.selectedSuggestionIndex).toEqual(2);
  });

  it("should select the next suggestion on arrow down", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAutocomplete(fetcher, handleSelection)
    );
    fetcher.mockResolvedValueOnce(["foo", "foo2", "foo3"]);
    act(() => {
      result.current.onChange({ target: { value: "foo" } });
    });
    await waitForNextUpdate();
    act(() => {
      result.current.onKeyDown({ key: "ArrowDown" });
    });
    act(() => {
      result.current.onKeyDown({ key: "ArrowDown" });
    });
    expect(result.current.selectedSuggestionIndex).toEqual(2);
  });

  it("should clear the suggestions on escape", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAutocomplete(fetcher, handleSelection)
    );
    fetcher.mockResolvedValueOnce(["foo", "foo2", "foo3"]);
    act(() => {
      result.current.onChange({ target: { value: "foo" } });
    });
    await waitForNextUpdate();
    act(() => {
      result.current.onKeyDown({ key: "Escape" });
    });
    expect(result.current.suggestions).toEqual([]);
  });
});