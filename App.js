import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const num = (t) => (t.trim() === '' ? NaN : Number(t.replace(',', '.')));

export default function App() {
  const [valor, setValor] = useState('');
  const [modo, setModo] = useState('CF'); // CF = Celsius → Fahrenheit
  const [res, setRes] = useState('');
  const [erro, setErro] = useState('');

  const converter = () => {
    setRes('');
    const v = num(valor);
    if (isNaN(v)) return setErro('Digite uma temperatura válida.');
    setErro('');
    if (modo === 'CF') setRes(`${v} °C = ${(v * 9 / 5 + 32).toFixed(2).replace('.', ',')} °F`);
    else setRes(`${v} °F = ${((v - 32) * 5 / 9).toFixed(2).replace('.', ',')} °C`);
  };

  const Opcao = ({ id, label }) => (
    <Pressable style={[s.op, modo === id && s.opAtiva]} onPress={() => { setModo(id); setRes(''); }}>
      <Text style={[s.opT, modo === id && { color: '#fff' }]}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={s.c}>
      <Text style={s.t}>🌡️ Conversor de temperatura</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        <Opcao id="CF" label="Celsius → Fahrenheit" />
        <Opcao id="FC" label="Fahrenheit → Celsius" />
      </View>
      <TextInput style={s.i} placeholder={modo === 'CF' ? 'Temperatura em °C' : 'Temperatura em °F'} keyboardType="numeric" value={valor} onChangeText={setValor} />
      <Pressable style={s.b} onPress={converter}><Text style={s.bt}>Converter</Text></Pressable>
      {erro !== '' && <Text style={s.e}>{erro}</Text>}
      {res !== '' && <Text style={s.r}>{res}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#f4f6fb' },
  t: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1f2a44' },
  i: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccd', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  b: { backgroundColor: '#3b6cf6', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  bt: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  op: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#3b6cf6', alignItems: 'center' },
  opAtiva: { backgroundColor: '#3b6cf6' },
  opT: { color: '#3b6cf6', fontWeight: '600', fontSize: 13 },
  r: { fontSize: 22, marginTop: 12, color: '#1f2a44', fontWeight: '700' },
  e: { color: '#c0392b', marginTop: 8 },
});