import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import {
  Advanced,
  CharSet,
  HistoryItem,
  PresetKey,
} from '@/types/generatorPageTypes';
import { Copy, Download, RefreshCw, Save } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';

const SYMBOLS_DEFAULT = '!@#$%^&*()-_=+[]{};:,.<>/?';
const SIMILAR = new Set(['O', '0', 'I', 'l', '1']);
const AMBIG = new Set([
  '{',
  '}',
  '[',
  ']',
  '(',
  ')',
  '/',
  '\\',
  "'",
  '"',
  '`',
  '~',
  ',',
  '.',
  ';',
  ':',
]);

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function ago(ms: number) {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}
function cryptoRandomInt(maxExclusive: number) {
  const arr = new Uint32Array(1);
  const limit = Math.floor(0xffffffff / maxExclusive) * maxExclusive;
  while (true) {
    crypto.getRandomValues(arr);
    const x = arr[0];
    if (x < limit) return x % maxExclusive;
  }
}
function pick<T>(arr: T[]) {
  return arr[cryptoRandomInt(arr.length)];
}
function entropyBits(len: number, pool: number) {
  if (pool <= 1) return 0;
  return len * Math.log2(pool);
}
function strength(bits: number) {
  if (bits >= 120) return { label: 'Very strong', tone: 'good' as const };
  if (bits >= 90) return { label: 'Strong', tone: 'good' as const };
  if (bits >= 70) return { label: 'Good', tone: 'ok' as const };
  if (bits >= 50) return { label: 'Fair', tone: 'warn' as const };
  return { label: 'Weak', tone: 'bad' as const };
}
function buildPool(opts: {
  charset: CharSet;
  customInclude: string;
  customExclude: string;
  symbols: string;
  advanced: Advanced;
}) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const nums = '0123456789';
  const sym = opts.symbols;

  let pool = '';
  if (opts.charset.upper) pool += upper;
  if (opts.charset.lower) pool += lower;
  if (opts.charset.numbers) pool += nums;
  if (opts.charset.symbols) pool += sym;
  if (opts.customInclude.trim()) pool += opts.customInclude;

  const excluded = new Set(opts.customExclude.split(''));
  if (opts.advanced.excludeSimilar) for (const c of SIMILAR) excluded.add(c);
  if (opts.advanced.excludeAmbiguous) for (const c of AMBIG) excluded.add(c);

  return Array.from(new Set(pool.split(''))).filter((c) => !excluded.has(c));
}
function genPassword(params: {
  length: number;
  charset: CharSet;
  minNumbers: number;
  minSymbols: number;
  symbols: string;
  customInclude: string;
  customExclude: string;
  advanced: Advanced;
  pinOnly: boolean;
}) {
  const { length } = params;

  if (params.pinOnly) {
    const digits = '0123456789'.split('');
    return Array.from({ length }, () => pick(digits)).join('');
  }

  const pool = buildPool({
    charset: params.charset,
    customInclude: params.customInclude,
    customExclude: params.customExclude,
    symbols: params.symbols,
    advanced: params.advanced,
  });

  if (pool.length < 2) return '';

  const numbersPool = params.charset.numbers ? '0123456789'.split('') : [];
  const symbolsPool = params.charset.symbols ? params.symbols.split('') : [];
  const lettersPool = [
    ...(params.charset.upper ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') : []),
    ...(params.charset.lower ? 'abcdefghijklmnopqrstuvwxyz'.split('') : []),
  ];

  const out: string[] = [];

  if (params.advanced.beginWithLetter) {
    if (!lettersPool.length) return '';
    out.push(pick(lettersPool));
  }

  const pushN = (p: string[], n: number) => {
    for (let i = 0; i < n; i++) {
      if (!p.length) return false;
      out.push(pick(p));
    }
    return true;
  };
  if (!pushN(numbersPool, clamp(params.minNumbers, 0, length))) return '';
  if (!pushN(symbolsPool, clamp(params.minSymbols, 0, length))) return '';

  while (out.length < length) {
    let next = pick(pool);
    if (params.advanced.avoidRepeats && out.length) {
      const last = out[out.length - 1];
      let tries = 0;
      while (next === last && tries < 10) {
        next = pick(pool);
        tries++;
      }
    }
    out.push(next);
  }

  for (let i = out.length - 1; i > 0; i--) {
    const j = cryptoRandomInt(i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }

  if (params.advanced.beginWithLetter) {
    if (!/[A-Za-z]/.test(out[0])) {
      const idx = out.findIndex((c) => /[A-Za-z]/.test(c));
      if (idx === -1) return '';
      [out[0], out[idx]] = [out[idx], out[0]];
    }
  }

  return out.join('');
}

function ToneBar({
  percent,
  tone,
}: {
  percent: number;
  tone: 'good' | 'ok' | 'warn' | 'bad';
}) {
  return (
    <div className="h-3 w-full rounded-full bg-muted">
      <div
        className={cn(
          'h-3 rounded-full transition-all',
          tone === 'good' && 'bg-emerald-500',
          tone === 'ok' && 'bg-blue-500',
          tone === 'warn' && 'bg-amber-500',
          tone === 'bad' && 'bg-rose-500',
        )}
        style={{ width: `${clamp(percent, 6, 100)}%` }}
      />
    </div>
  );
}

export default function PasswordGeneratorPage() {
  const [preset, setPreset] = useState<PresetKey>('balanced');

  const [length, setLength] = useState(16);
  const [charset, setCharset] = useState<CharSet>({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });
  const [minNumbers, setMinNumbers] = useState(2);
  const [minSymbols, setMinSymbols] = useState(2);

  const [advanced, setAdvanced] = useState<Advanced>({
    excludeSimilar: false,
    excludeAmbiguous: false,
    avoidRepeats: false,
    beginWithLetter: false,
  });

  const [symbols, setSymbols] = useState(SYMBOLS_DEFAULT);
  const [customInclude, setCustomInclude] = useState('');
  const [customExclude, setCustomExclude] = useState('');

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [password, setPassword] = useState('');

  const poolSize = useMemo(
    () =>
      buildPool({ charset, customInclude, customExclude, symbols, advanced })
        .length,
    [charset, customInclude, customExclude, symbols, advanced],
  );

  const bits = useMemo(() => entropyBits(length, poolSize), [length, poolSize]);
  const s = useMemo(() => strength(bits), [bits]);

  const isPin = preset === 'pin';
  const canMinNumbers = charset.numbers && !isPin;
  const canMinSymbols = charset.symbols && !isPin;

  function applyPreset(p: PresetKey) {
    setPreset(p);
    if (p === 'max') {
      setLength(32);
      setCharset({ upper: true, lower: true, numbers: true, symbols: true });
      setMinNumbers(3);
      setMinSymbols(3);
      setAdvanced((a) => ({ ...a, beginWithLetter: false }));
    } else if (p === 'balanced') {
      setLength(16);
      setCharset({ upper: true, lower: true, numbers: true, symbols: true });
      setMinNumbers(2);
      setMinSymbols(2);
      setAdvanced((a) => ({ ...a, beginWithLetter: false }));
    } else if (p === 'easy') {
      setLength(12);
      setCharset({ upper: true, lower: true, numbers: true, symbols: false });
      setMinNumbers(2);
      setMinSymbols(0);
      setAdvanced((a) => ({
        ...a,
        excludeSimilar: true,
        beginWithLetter: true,
      }));
    } else if (p === 'pin') {
      setLength(6);
      setCharset({ upper: false, lower: false, numbers: true, symbols: false });
      setMinNumbers(0);
      setMinSymbols(0);
      setAdvanced((a) => ({ ...a, beginWithLetter: false }));
    }
    // generate after state settles
    setTimeout(() => regenerate(p), 0);
  }

  function regenerate(p?: PresetKey) {
    const presetNow = p ?? preset;
    const next = genPassword({
      length,
      charset,
      minNumbers: clamp(minNumbers, 0, length),
      minSymbols: clamp(minSymbols, 0, length),
      symbols,
      customInclude,
      customExclude,
      advanced,
      pinOnly: presetNow === 'pin',
    });

    if (!next) {
      setPassword('');
      toast.warning('No valid character pool!', {
        description: 'Enable types or adjust exclusions.',
      });
      return;
    }

    setPassword(next);
    setHistory((prev) => {
      const item: HistoryItem = {
        id: crypto.randomUUID(),
        value: next,
        createdAt: Date.now(),
        meta: `${length} chars`,
      };
      return [item, ...prev].slice(0, 3);
    });
  }

  async function copyPwd() {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      toast.warning('Copied!', {
        description: 'Password copied.',
      });
    } catch (err) {
      toast.warning('Copy failed', {
        description: 'Failed to copy password.',
      });
    }
  }

  function exportTxt() {
    if (!password) return;
    const blob = new Blob([password], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lockbase-password.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported!', {
      description: 'Password exported.',
    });
  }

  function savePlaceholder() {
    if (!password) return;
    toast.info('Save to Vault?', {
      description: 'wire later.',
    });
  }

  // initial generate
  React.useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full overflow-auto px-4 py-6">
      <div className="mx-5 w-auto">
        <div className="mb-5 ml-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            Password Generator
          </h1>
          <p className="text-md text-muted-foreground">
            Generate secure passwords locally. No backend required.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Main */}
          <div className="lg:col-span-8 space-y-4">
            <Card className="border-border/60">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>Generate</CardTitle>
                  <CardDescription>
                    Regenerate until it matches the policy you need.
                  </CardDescription>
                </div>
                <Button
                  variant="secondary"
                  className="gap-2 hover:scale-105 hover:shadow-purple-400/70  hover:shadow-lg  transition-all duration-200"
                  onClick={() => regenerate()}
                >
                  <RefreshCw className="h-4 w-4" /> Regenerate
                </Button>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex-1 rounded-xl border bg-muted/40 px-4 py-3 font-mono text-base tracking-wider">
                    {password || (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="gap-2 bg-purple-500 text-white hover:scale-105 transition-all duration-200"
                      onClick={copyPwd}
                      disabled={!password}
                    >
                      <Copy className="h-4 w-4" /> Copy
                    </Button>
                    <Button
                      className="gap-2 bg-green-500 dark:bg-green-600 text-white hover:scale-105 transition-all duration-200"
                      onClick={savePlaceholder}
                      disabled={!password}
                    >
                      <Save className="h-4 w-4" /> Save
                    </Button>
                    <Button
                      className="gap-2 bg-orange-500/80 dark:bg-orange-600 text-white hover:scale-105 transition-all duration-200"
                      onClick={exportTxt}
                      disabled={!password}
                    >
                      <Download className="h-4 w-4" /> Export
                    </Button>
                  </div>
                </div>

                <div className="rounded-xl border bg-blue-100/40 dark:bg-black/50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-md font-medium">Strength</div>
                    <Badge
                      className={cn(
                        'capitalize',
                        s.tone === 'good' && 'bg-emerald-600',
                        s.tone === 'ok' && 'bg-blue-600',
                        s.tone === 'warn' && 'bg-amber-600',
                        s.tone === 'bad' && 'bg-rose-600',
                        'px-3 py-1.5',
                      )}
                    >
                      {s.label}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <ToneBar percent={(bits / 140) * 100} tone={s.tone} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                    <div className="rounded-lg bg-white dark:bg-muted/40 px-3 py-2">
                      <div className="text-xs text-muted-foreground">
                        Length
                      </div>
                      <div className="font-semibold">{length}</div>
                    </div>
                    <div className="rounded-lg bg-white dark:bg-muted/40 px-3 py-2">
                      <div className="text-xs text-muted-foreground">Pool</div>
                      <div className="font-semibold">{poolSize}</div>
                    </div>
                    <div className="rounded-lg bg-white dark:bg-muted/40 px-3 py-2">
                      <div className="text-xs text-muted-foreground">
                        Entropy
                      </div>
                      <div className="font-semibold">
                        {bits.toFixed(1)} bits
                      </div>
                    </div>
                    <div className="rounded-lg bg-white dark:bg-muted/40 px-3 py-2">
                      <div className="text-xs text-muted-foreground">Mode</div>
                      <div className="font-semibold">Local</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Choose character types and constraints.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Password length</Label>
                    <span className="text-sm text-muted-foreground">
                      {length} chars
                    </span>
                  </div>
                  <Slider
                    value={[length]}
                    min={6}
                    max={64}
                    step={1}
                    onValueChange={(v) => setLength(v[0])}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <ToggleRow
                    label="Uppercase"
                    desc="A–Z"
                    checked={charset.upper}
                    onCheckedChange={(v) =>
                      setCharset((c) => ({ ...c, upper: v }))
                    }
                  />
                  <ToggleRow
                    label="Lowercase"
                    desc="a–z"
                    checked={charset.lower}
                    onCheckedChange={(v) =>
                      setCharset((c) => ({ ...c, lower: v }))
                    }
                  />
                  <ToggleRow
                    label="Numbers"
                    desc="0–9"
                    checked={charset.numbers}
                    onCheckedChange={(v) =>
                      setCharset((c) => ({ ...c, numbers: v }))
                    }
                  />
                  <ToggleRow
                    label="Symbols"
                    desc="!@#$…"
                    checked={charset.symbols}
                    onCheckedChange={(v) =>
                      setCharset((c) => ({ ...c, symbols: v }))
                    }
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <ToggleRow
                    label="Exclude similar"
                    desc="O/0, I/l/1"
                    checked={advanced.excludeSimilar}
                    onCheckedChange={(v) =>
                      setAdvanced((a) => ({ ...a, excludeSimilar: v }))
                    }
                  />
                  <ToggleRow
                    label="Exclude ambiguous"
                    desc="Brackets, quotes…"
                    checked={advanced.excludeAmbiguous}
                    onCheckedChange={(v) =>
                      setAdvanced((a) => ({ ...a, excludeAmbiguous: v }))
                    }
                  />
                  <ToggleRow
                    label="Avoid repeats"
                    desc="Less adjacent duplicates"
                    checked={advanced.avoidRepeats}
                    onCheckedChange={(v) =>
                      setAdvanced((a) => ({ ...a, avoidRepeats: v }))
                    }
                  />
                  <ToggleRow
                    label="Begin with letter"
                    desc="Some policies require this"
                    checked={advanced.beginWithLetter}
                    onCheckedChange={(v) =>
                      setAdvanced((a) => ({ ...a, beginWithLetter: v }))
                    }
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Include characters</Label>
                    <Input
                      value={customInclude}
                      onChange={(e) => setCustomInclude(e.target.value)}
                      placeholder="e.g. @_#"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Exclude characters</Label>
                    <Input
                      value={customExclude}
                      onChange={(e) => setCustomExclude(e.target.value)}
                      placeholder="e.g. O0Il1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Symbol set</Label>
                  <Input
                    value={symbols}
                    onChange={(e) => setSymbols(e.target.value)}
                    placeholder="Default symbols"
                  />
                  <p className="text-xs text-muted-foreground">
                    Keep conservative for legacy systems.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Min numbers</Label>
                    <Input
                      type="number"
                      min={0}
                      value={minNumbers}
                      disabled={!canMinNumbers}
                      onChange={(e) =>
                        setMinNumbers(
                          clamp(parseInt(e.target.value || '0', 10), 0, length),
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Min symbols</Label>
                    <Input
                      type="number"
                      min={0}
                      value={minSymbols}
                      disabled={!canMinSymbols}
                      onChange={(e) =>
                        setMinSymbols(
                          clamp(parseInt(e.target.value || '0', 10), 0, length),
                        )
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button
                    onClick={() => regenerate()}
                    className="gap-2 bg-purple-500 text-white hover:scale-105 transition-all duration-200"
                  >
                    Generate
                  </Button>
                  <Button
                    className="bg-green-500 dark:bg-green-600 text-white hover:scale-105 transition-all duration-200"
                    onClick={() => {
                      applyPreset('balanced');
                      setCustomInclude('');
                      setCustomExclude('');
                      setSymbols(SYMBOLS_DEFAULT);
                      setAdvanced({
                        excludeSimilar: false,
                        excludeAmbiguous: false,
                        avoidRepeats: false,
                        beginWithLetter: false,
                      });
                      toast.info('Reset!', {
                        description: 'Settings reset to defaults.',
                      });
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Quick presets</CardTitle>
                <CardDescription>One click, then generate.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <PresetButton
                  active={preset === 'max'}
                  title="Maximum"
                  desc="32 · all types"
                  onClick={() => applyPreset('max')}
                  activeRingClassName="ring-red-500"
                  activeBorderClassName="border-red-500"
                />
                <PresetButton
                  active={preset === 'balanced'}
                  title="Balanced"
                  desc="16 · mixed"
                  onClick={() => applyPreset('balanced')}
                  activeRingClassName="ring-purple-500"
                  activeBorderClassName="border-purple-500"
                />
                <PresetButton
                  active={preset === 'easy'}
                  title="Easy"
                  desc="12 · no symbols"
                  onClick={() => applyPreset('easy')}
                  activeRingClassName="ring-green-500"
                  activeBorderClassName="border-green-500"
                />
                <PresetButton
                  active={preset === 'pin'}
                  title="PIN"
                  desc="6 digits"
                  onClick={() => applyPreset('pin')}
                  activeRingClassName="ring-orange-500"
                  activeBorderClassName="border-orange-500"
                />
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>Recent</CardTitle>
                  <CardDescription>Click to copy.</CardDescription>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setHistory([])}
                >
                  Clear
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {history.length === 0 ? (
                  <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                    No history yet.
                  </div>
                ) : (
                  history.map((h) => (
                    <button
                      key={h.id}
                      onClick={async () => {
                        setPassword(h.value);
                        try {
                          await navigator.clipboard.writeText(h.value);
                          toast.warning('Copied!', {
                            description: 'Password copied to clipboard.',
                          });
                        } catch (err) {
                          toast.warning('Copy failed', {
                            description:
                              'Failed to copy password to clipboard.',
                          });
                        }
                      }}
                      className={cn(
                        'w-full rounded-xl border bg-background/40 px-3 py-3 text-left transition hover:bg-background/70',
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="truncate font-mono text-sm">
                          {h.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {ago(Date.now() - h.createdAt)}
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {h.meta}
                      </div>
                    </button>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-violet-400 dark:bg-violet-900 text-white">
              <CardHeader>
                <CardTitle>Tips</CardTitle>
                <CardDescription className="text-white/70">
                  Practical defaults.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-white">
                <p>• Use 16+ characters for important accounts.</p>
                <p>• Prefer unique passwords + 2FA.</p>
                <p>• Avoid symbols on sites that break copy/paste.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  desc,
  checked,
  onCheckedChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-background/40 px-4 py-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function PresetButton({
  active,
  title,
  desc,
  onClick,
  activeRingClassName = 'ring-primary/40',
  activeBorderClassName = 'border-primary/40',
}: {
  active: boolean;
  title: string;
  desc: string;
  onClick: () => void;
  activeRingClassName?: string;
  activeBorderClassName?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-xl border px-3 py-3 text-left transition hover:bg-muted/40',
        active && cn('ring-2', activeRingClassName, activeBorderClassName),
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </button>
  );
}
