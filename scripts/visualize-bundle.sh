#!/usr/bin/env bash

mkdir -p bundle-analysis

nb=$(ls bundle-analysis | wc -l)
fn="bundle-analysis/stats-$nb.html"
npx vite-bundle-visualizer --config vite.config.ts --output $fn