import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GameCard, { AnimatedGameCard } from "./GameCard";
import { Logo } from "./Logo";

export function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={{ marginVertical: 20 }}>
        <Logo />
      </View>
      {games.length === 0 ? (
        <ActivityIndicator size={48} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game?.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </View>
  );
}
