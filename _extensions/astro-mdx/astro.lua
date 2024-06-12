local kQuartoRawHtml = "quartoRawHtml"
local rawHtmlVars = pandoc.List()

local code_block = require('astro_utils').code_block

local reactPreamble = pandoc.List()

local function isAstroOutput()
  return param("quarto-custom-format", "") == "astro"
end

local function Pandoc(doc)
  -- insert exports at the top if we have them
  if #rawHtmlVars > 0 then
    local exports = ("export const %s =\n[%s];"):format(kQuartoRawHtml, 
      table.concat(
        rawHtmlVars:map(function(var) return '`'.. var .. '`' end), 
        ","
      )
    )
    doc.blocks:insert(1, pandoc.RawBlock("markdown", exports .. "\n"))
  end

  -- insert react preamble if we have it
  if #reactPreamble > 0 then
    local preamble = table.concat(reactPreamble, "\n")
    doc.blocks:insert(1, pandoc.RawBlock("markdown", preamble .. "\n"))
  end

  return doc
end

-- strip image attributes (which may result from
-- fig-format: retina) as they will result in an
-- img tag which won't hit the asset pipeline
local function Image(el)
  el.attr = pandoc.Attr()
  return el
end

-- header attributes only support id
local function Header(el)
  el.attr = pandoc.Attr(el.identifier)
  return el
end

-- transform 'mdx' into passthrough content, transform 'html'
-- into raw commamark to pass through via dangerouslySetInnerHTML
local function RawBlock(el)
  return pandoc.RawBlock("markdown", el.text)
end

local function DecoratedCodeBlock(node)
  local el = node.code_block
  return code_block(el, node.filename)
end

local function Table(tbl)
  local out = pandoc.write(pandoc.Pandoc({tbl}), FORMAT, PANDOC_WRITER_OPTIONS)
  -- if the table was written in a way that looks like HTML, then wrap it in the right RawBlock way
  if string.match(out, "^%s*%<table") then
    local unwrapped = pandoc.RawBlock('html', out)
    return RawBlock(unwrapped)
  end
end

quarto._quarto.ast.add_renderer("DecoratedCodeBlock", function()
  return isAstroOutput()
end, function(node)
  local el = node.code_block
  return code_block(el, node.filename)
end)


quarto._quarto.ast.add_renderer("FloatRefTarget", function()
  return isAstroOutput()
end, function(float)
  float = quarto.doc.crossref.decorate_caption_with_crossref(float)
  if quarto.doc.crossref.cap_location(float) == "top" then
    return pandoc.Blocks({
      pandoc.RawBlock("markdown", "<div id=\"" .. float.identifier .. "\">"),
      pandoc.Div(quarto.utils.as_blocks(float.caption_long)),
      pandoc.Div(quarto.utils.as_blocks(float.content)),
      pandoc.RawBlock("markdown", "</div>")
    })
  else
    return pandoc.Blocks({
      pandoc.RawBlock("markdown", "<div id=\"" .. float.identifier .. "\">"),
      pandoc.Div(quarto.utils.as_blocks(float.content)),
      pandoc.Div(quarto.utils.as_blocks(float.caption_long)),
      pandoc.RawBlock("markdown", "</div>")
    })
  end
end)

return {
  {
    traverse = "topdown",
    Image = Image,
    Header = Header,
    RawBlock = RawBlock,
    DecoratedCodeBlock = DecoratedCodeBlock,
    CodeBlock = CodeBlock,
    Table = Table,
  },
  {
    Pandoc = Pandoc,
  }
}