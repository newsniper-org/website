-- astro_code_blocks.lua
-- a modified version of docusaurus_code_blocks.lua from quarto-cli, adapted for Astro

local code_block = require('astro_utils').code_block

return {
  traverse = "topdown",
  DecoratedCodeBlock = function(el)
    return nil, false -- defer to the custom renderer later in the pipeline
  end,
  CodeBlock = function(el)
    return code_block(el, el.attr.attributes["filename"])
  end,
}